import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { Observable, tap } from 'rxjs';
import Cookies from 'js-cookie';
import { Project } from '../../projects/models/project';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly API_URL = `http://localhost:8083/api/v1/team`;

  constructor(private http:HttpClient) { }

  createTeam(team: Team): Observable<Team>{
    return this.http.post<Team>(
      `${this.API_URL}`,team,
      {
        responseType: 'json',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    ).pipe(
      tap(response =>{
        console.log(response);
      })
    );
  }

  //Get all teams
  getAllTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(`${this.API_URL}/all`,{
      responseType: 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }
  ).pipe(
    tap(response =>{
      // console.log(response);
      
    })
  );
  }

  //Update Team
  updateTeam(team: Team): Observable<Team>{
    return this.http.put<Team>(
      `${this.API_URL}`,team,
      {
        responseType: 'json',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    ).pipe(
      tap(response =>{
        console.log(response);
      })
    );
  }


  //Delete team
  deleteTeam(team: Team): Observable<HttpResponse<Team>> {
    return this.http.delete<HttpResponse<Team>>(
      `${this.API_URL}/${team.id}`, 
      {
        responseType: 'json',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
    ).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }


  getTeamsBySpaceId(spaceId: string): Observable<Team[]> {
    return this.http.get<Team[]>(`/api/spaces/${spaceId}/teams`);
  }

  getProjectsByTeamId(teamId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`/api/teams/${teamId}/projects`);
  }
}
