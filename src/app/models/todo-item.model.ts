
export class TodoItem{
    name:string;
    isDone:boolean;
    dateCreated: Date;
    dateDue: Date;

    constructor(name:string){
      this.name=name;
      this.isDone=false;
      this.dateCreated=new Date();
      this.dateDue=new Date();
      this.dateDue.setTime(this.dateCreated.getTime()+24*60*60*1000);
    }
  }