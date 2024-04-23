export type User = {
    sub: number;
    email: string;
    password: string;
    exp: number;
    iat: number;

}

export type MemberInfo = {
    membreId: number,
    projectid: number,
    role: string,
    userId: number,
    username: string,
    password: string,
    email: string
  }

export type Project = {
  id: number,
  name: string,
  description: string,
  startdate: Date,
  enddate: Date,
  listListDTO: List[];
  listMembreDTO: Object[];
}

export type List = {
    id: number,
    name: string,
    position: number,
    statusEnum: string,
    listTaskDTO: number[],
    projectId: number
  }
  
  
  export type Task = {
    id?: number,
    name: string,
    description: string,
    startdate?: Date | null,
    enddate?: Date | null,
    position: number,
    statusEnum: string,
    listEntityId: number,
    listLabelEntityId: number[],
    membreId: number   
  }

  export enum StatusEnum {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
  }
  