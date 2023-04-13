import {Session} from "@inrupt/solid-client-authn-browser";

export type User = {
    username:string;
    password:string;
    email:string;
  }
export type SessionType = {
    session: Session;
}
