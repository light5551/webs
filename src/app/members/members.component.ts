import { Component, OnInit } from '@angular/core';
import {MembersService} from '../shared/members.service';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-members-manager',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
    constructor(private service: MembersService) { }

    private loading = true;

    ngOnInit() {
        this.service.fetchMembers()
            .subscribe(() => {
                this.loading = false;
            });
    }

    delMember(id: number) {
        this.service.removeMember(id)
        .subscribe(() => {
                this.service.fetchMembers()
                    .subscribe();
            });
    }
}
