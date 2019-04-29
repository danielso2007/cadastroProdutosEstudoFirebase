import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import { MatSnackBar } from '@angular/material';

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
        protected injector: Injector,
        protected snackBar: MatSnackBar
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
        this.actionsForSuccess(resource); 
        this.action = false; 
        this.resourceForm.enable(); 
    }

    protected actionsForSuccess(resource: T) {
        const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
        this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true })
            .then(() => this.router.navigate([baseComponentPath, resource.id, 'edit']));
    }

    protected actionsForError(error: any) {
        this.snackBar.open('Error in request.', 'Ok', {duration: 4000});
        this.action = false;
        this.resourceForm.enable();
        console.error(error);
        this.submittingForm = false;
        if (error.status === 422) {
            this.serverErrorMessages = JSON.parse(error._body).errors;
        } else {
            this.serverErrorMessages = ['Failure to communicate with the server. Please try again later.'];
        }
    }

    protected update(): void {
        const resource: T = this.resourceService.castObject(this.resourceForm.getRawValue());
        this.action = true;
        this.resourceForm.disable();
        this.resourceService.update(resource)
            .then(
                result => { 
                    this.actionsForSuccess(resource);
                    this.action = false;
                    this.resourceForm.enable();
                }, error => this.actionsForError(error)
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
     * When updating the object, re-launch it in:
     * this.resourceForm.patchValue(resource);
     */
    protected load(): void {
        this.action = true;
        this.resourceForm.disable();
        if (this.currentAction === 'edit') {
            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(String(params.get('id'))))
            ).subscribe(
                (resource) => {
                    this.resource = resource;
                    this.resourceForm.patchValue(this.afterLoad(this.resource));
                    this.action = false;
                    this.resourceForm.enable();
                },
                (error) => alert('An error occurred on the server')
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
