import { BaseResourceModel } from "../models/base-resource.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injector } from "@angular/core";

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected headersHttpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'my-auth-token'
        })
    };

    protected http: HttpClient;

    constructor(protected injector: Injector, protected apiPath: string, protected testType: new () => T) {
        // this.apiPath = environment.url_api + this.apiPath;
        this.http = this.injector.get(HttpClient);
    }

    getNew() : T {
        return new this.testType();
    }

    castObject(element: any): T {
        return Object.assign(this.getNew(), element)
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            map(this.jsonDataToResources.bind(this)), // Bind é necessário para passar a instância da classe, não o do map.
            catchError(this.handleError)
        );
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url, this.headersHttpOptions).pipe(
            map(this.jsonDataToResource.bind(this)), // Bind é necessário para passar a instância da classe, não o do map.
            catchError(this.handleError)
        );
    }

    create(category: T): Observable<T> {
        return this.http.post(this.apiPath, category, this.headersHttpOptions).pipe(
            map(this.jsonDataToResource.bind(this)), // Bind é necessário para passar a instância da classe, não o do map.
            catchError(this.handleError)
        );
    }

    update(category: T): Observable<T> {
        return this.http.put(`${this.apiPath}/${category.id}`, category, this.headersHttpOptions).pipe(
            map(() => category),
            catchError(this.handleError)
        );
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.apiPath}/${id}`, this.headersHttpOptions).pipe(
            map(() => null),
            catchError(this.handleError)
        );
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
        console.error('ERRO NA REQUISIÇAO => ', error);
        return throwError(error);
    }

}
