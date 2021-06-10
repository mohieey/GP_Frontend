import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserInteractionDetailsDTO } from '../_interfaces/userInteractionDetailsDTO.model';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  constructor(private _http: HttpClient) {}

  follow(userId: string): Observable<any> {
    let url = `${environment.apiUrl}/user/follow/${userId}`;
    return this._http.post<string>(url, null).pipe(
      catchError((err) => {
        return throwError(
          err.message || 'Internal Server error contact site adminstarator'
        );
      })
    );
  }

  unfollow(userId: string): Observable<any> {
    let url = `${environment.apiUrl}/user/unfollow/${userId}`;
    return this._http.post<string>(url, null).pipe(
      catchError((err) => {
        return throwError(
          err.message || 'Internal Server error contact site adminstarator'
        );
      })
    );
  }

  getFollowingByPage(
    pageSize: number,
    pageNumber: number
  ): Observable<UserInteractionDetailsDTO[]> {
    let url = `${environment.apiUrl}/user​/following/${pageSize}/${pageNumber}`;
    return this._http.get<UserInteractionDetailsDTO[]>(url).pipe(
      catchError((err) => {
        return throwError(
          err.message || 'Internal Server error contact site adminstarator'
        );
      })
    );
  }
}
