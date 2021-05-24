import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login(user:any)
  {
    const u:any = {email:user.email, password:user.password};
    console.log(u);

    /** POST: add a new hero to the database */
    return this.http.post('https://localhost:44322/api/Account/login', u,{ observe: 'response' })
    // .pipe(catchError((err)=>{
    //   return throwError(err.message || "Internal Server Error Please contact site adminstarator")
    // })
    // )



    // this.http.post('http://localhost:1998/api/users', u,{ observe: 'response' }).toPromise().then(response => console.log(response.headers.get('x-auth-token')));
  }
}
