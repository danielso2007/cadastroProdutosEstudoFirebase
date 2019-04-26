import { OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export class BaseListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];
  action = false;

  constructor(protected resourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      resources => this.resources = resources,
      error => alert('Erro ao criar lista')
    );
  }

  delete(resource: T): void {
    this.action = true;
    const mustDelete = confirm('Do you really want to delete this item?');
    if (mustDelete) {
      this.resourceService.delete(resource.id).then(
        () => {
          this.resources = this.resources.filter(element => element !== resource);
          this.action = false;
        },
        error => { alert('Error deleting item'); this.action = false; }
      );
    } else {
      this.action = false;
    }
  }

}
