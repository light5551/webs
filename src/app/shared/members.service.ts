import {Injectable} from '@angular/core';
import {observable, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap, retry} from 'rxjs/operators';

export interface Member {
  id: number;
  name: string;
  money: number;
}

@Injectable({providedIn: 'root'})
export class MembersService {

  constructor(private http: HttpClient) {}

  public members: Member[] = [];
  private serverUrl = 'http://localhost:4201/members/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    return throwError('Try again');
  }

  fetchMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.serverUrl)
        .pipe(tap((members) => this.members = members));
  }

  removeMember(memID: number): Observable<Member> {
     const data: Member = {id: memID, name: '', money: 0};
     return this.http.post<Member>(this.serverUrl + 'del', data, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
  }
}
