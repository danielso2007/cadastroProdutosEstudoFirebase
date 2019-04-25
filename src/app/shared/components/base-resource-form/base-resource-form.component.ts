import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string;
    resourceForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;
    action: boolean = false;
    resource: T;

    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

    constructor(
        protected resourceService: BaseResourceService<T>,
        protected injector: Injector
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder);
    }

    ngOnInit() {
        this.setCurrentAction();
        this.buildForm();
        this.load();
    }

    ngAfterContentChecked() {
        this.setPageTitle();
    }

    submitForm(): void {
        this.submittingForm = true;

        if (this.currentAction === 'new') {
            this.create();
        } else {
            this.update();
        }
    }

    protected create(): void {
        const resource: T = this.resourceService.castObject(this.resourceForm.getRawValue());
        this.action = true;
        this.resourceForm.disable();
        this.resourceService.create(resource)
            .subscribe(
                resource => { this.actionsForSuccess(resource); this.action = false; this.resourceForm.enable(); },
                error => this.actionsForError(error)
            );
    }

    protected actionsForSuccess(resource: T) {
        // toastr.success('Solicitação processada com sucesso!');
        const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
        this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true })
            .then(
                () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
            );
    }

    protected actionsForError(error: any) {
        // toastr.error('Erro na solicitaçao!');
        this.action = false;
        this.resourceForm.enable();
        console.error(error);
        this.submittingForm = false;
        if (error.status === 422) {
            this.serverErrorMessages = JSON.parse(error._body).errors;
        } else {
            this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
        }
    }

    protected update(): void {
        const resource: T = this.resourceService.castObject(this.resourceForm.getRawValue());
        this.action = true;
        this.resourceForm.disable();
        this.resourceService.update(resource)
            .subscribe(
                resource => { this.actionsForSuccess(resource); this.action = false; this.resourceForm.enable(); },
                error => this.actionsForError(error)
            );
    }

    protected setCurrentAction(): void {
        if (this.route.snapshot.url[0].path === 'new') {
            this.currentAction = 'new';
        } else {
            this.currentAction = 'edit';
        }
    }

    protected abstract buildForm(): void;

    protected afterLoad(resource: T): T {
        return resource;
    }

    /**
     * Ao atualizar o object, seta-lo novamente em:
     * this.resourceForm.patchValue(resource);
     */
    protected load(): void {
        this.action = true;
        this.resourceForm.disable();
        if (this.currentAction === 'edit') {
            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(Number(params.get('id'))))
            ).subscribe(
                (resource) => {
                    this.resource = resource;
                    this.resourceForm.patchValue(this.afterLoad(this.resource));
                    this.action = false;
                    this.resourceForm.enable();
                },
                (error) => alert('Ocorreu um erro no servidor')
            );
        } else {
            this.resource = this.resourceService.getNew();
            this.action = false;
            this.resourceForm.enable();
        }
    }

    protected setPageTitle(): void {
        if (this.currentAction === 'new') {
            this.pageTitle = this.creationPageTitle();
        } else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected creationPageTitle(): string {
        return "Novo";
    }

    protected editionPageTitle(): string {
        return "Edição";
    }

}
