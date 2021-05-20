import {Injectable} from '@angular/core';
import {Auth} from 'aws-amplify';
import {CognitoUserSession} from 'amazon-cognito-identity-js';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public get snapUser(): User | null {
    return this.userSubject.value;
  }

  constructor() {
  }

  private sessionSubject: BehaviorSubject<CognitoUserSession | null> = new BehaviorSubject(null);
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject(null);

  readonly session$: Observable<CognitoUserSession> = this.sessionSubject.asObservable();
  readonly user$: Observable<User> = this.userSubject.asObservable();

  sentConfirmationCodeTo?: string;

  async updateCurrentUser(): Promise<void> {
    let userInfo;
    let session: CognitoUserSession;
    try {
      userInfo = await Auth.currentAuthenticatedUser();
      session = await Auth.currentSession();
    } catch (e) {
      this.userSubject.next(null);
      this.sessionSubject.next(null);
      return;
    }
    if (!userInfo) {
      this.userSubject.next(null);
      this.sessionSubject.next(null);
      return;
    }
    const groups: string[] = session.getIdToken().decodePayload()['cognito:groups'] ?? [];
    const user: User = {
      id: userInfo.id,
      email: userInfo.attributes.email,
      firstName: userInfo.attributes.name,
      nickname: userInfo.attributes.name ?? null,
      lastName: userInfo.attributes.family_name,
      middleName: userInfo.attributes.name ?? null,
      isScouter: groups.indexOf('Scouters') > -1,
      isAdmin: groups.indexOf('Admins') > -1,
      isBeneficiary: groups.indexOf('Beneficiaries') > -1,
    };

    this.userSubject.next(user);
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      await Auth.signIn(email, password);
      await this.updateCurrentUser();
      return true;
    } catch (error) {
      if (error.code === 'NotAuthorizedException' || error.code === 'UserNotFoundException') {
        return false;
      }
      throw error;
    }
  }

  async sendConfirmationCode(email: string): Promise<boolean> {
    try {
      await Auth.resendSignUp(email);
      return true;
    } catch (e) {
      if (e.code === 'LimitExceededException') {
        return false;
      }
      throw e;
    }
  }

  async signUp(
    email: string,
    password: string,
    nickname: string,
    name: string,
    middleName: string | null,
    lastName: string
  ): Promise<boolean> {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
          middle_name: middleName,
          family_name: lastName,
          nickname
        }
      });
      return true;
    } catch (error) {
      if (error.code === 'NotAuthorizedException') {
        return false;
      }
      throw error;
    }
  }

  async signOut(): Promise<void> {
    await Auth.signOut();
  }

  async confirm(email: string, code: string): Promise<boolean> {
    try {
      await Auth.confirmSignUp(email, code);
      return true;
    } catch (error) {
      switch (error.code) {
        case 'InvalidParameterException':
          return false;
        case 'CodeMismatchException':
          return false;
      }
      throw error;
    }
  }
}
