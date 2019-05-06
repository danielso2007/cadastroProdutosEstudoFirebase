import { BaseResourceModel } from "../models/base-resource.model";
import { Observable, throwError } from 'rxjs';
import { catchError, map, first } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected collections: AngularFirestoreCollection<T> = 
            this.afs.collection<T>(this.collectionsName, ref => ref.orderBy(this.orderByField || 'id'));

    constructor(
        protected afs: AngularFirestore, 
        protected collectionsName: string,
        protected orderByField: string,
        protected testType: new () => T) {
    }

    getNew() : T {
        return new this.testType();
    }

    castObject(element: any): T {
        return Object.assign(this.getNew(), element);
    }

    create(): Promise<T> {
        return Promise.resolve(this.getNew());
    }

    protected result() {
        return (
            map(this.jsonDataToResource.bind(this)), // Bind é necessário para passar a instância da classe, não o do map.
            catchError(this.handleError)
        );
    }

    getAll(): Observable<T[]> {
        return this.collections.valueChanges()
        .pipe(this.result());
    }

    getAllSnapshotChanges(): Observable<DocumentChangeAction<T>[]> {
        return this.collections.snapshotChanges();
    }


    getById(id: string): Observable<T> {
        return this.afs.collection(this.collectionsName, ref => ref.where('id', '==', id))
        .valueChanges().pipe(first())
        .pipe(this.result());
    }

    save(obj: T): Promise<void | Observable<any>> {
        obj.id = this.afs.createId();
        obj.createAt = new Date().getTime();
        delete obj.updateAt;
        return this.collectionsDoc(obj);
    }

    update(obj: T): Promise<void | Observable<any>> {
        if (obj.id) {
            obj.updateAt = new Date().getTime();
            return this.collectionsDoc(obj);
        } else {
            throwError('Id not informed.');
        }
    }

    private collectionsDoc(obj: T): Promise<void | Observable<any>> {
        //Firebase only accepts pure javascript data.
        let entityJavaScript = Object.assign({}, obj);
        return this.collections.doc(entityJavaScript.id).set(entityJavaScript)
        .catch(this.handleError);
    }

    delete(obj: string | T): Promise<void> {
        let id: any = obj;
        if (typeof obj !== 'string') {
            id = obj.id;
        }
        return this.collections.doc(id).delete()
    }

    jsonDataToResources(jsonData: any[]): T[] {
        const list: T[] = [];
        try {
            jsonData.forEach(element => list.push(this.castObject(element)));
        } catch (erro) {
            console.error(erro);
        }
        return list;
    }

    jsonDataToResource(jsonData: any): T {
        try {
            return this.castObject(jsonData);
        } catch (erro) {
            console.error(erro);
        }
    }

    handleError(error: any): Observable<any> {
        console.error('ERROR IN REQUIREMENT => ', error);
        return throwError(error);
    }

}
