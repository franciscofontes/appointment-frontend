import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthorityGuardService } from 'src/app/services/authority-guard.service';

@Directive({
    selector: '[hasAuthority]'
})
export class AuthorityDirective implements OnInit {

    private authorities = [];
    private isHidden = true;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authorityGuardService: AuthorityGuardService
    ) { }

    ngOnInit() {
    }

    @Input()
    set hasAuthority(val) {
        this.authorities = val;
        this.updateView();
    }

    private updateView() {
        if (this.checkAuthority()) {
            if (this.isHidden) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.isHidden = false;
            }
        } else {
            this.isHidden = true;
            this.viewContainer.clear();
        }
    }

    private checkAuthority() {
        let permission = false;
        for (const a of this.authorities) {
            if (this.authorityGuardService.hasAuthority(a)) {
                permission = true;
            }
        }
        return permission;
    }
}
