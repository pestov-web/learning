export class TodoItem {
  constructor(
    public id: number,
    public task: string,
    public complete: boolean = false
  ) {
    // не требуется никаких операторов
  }

  printDetails(): void {
    console.log(
      `${this.id}\t${this.task} ${this.complete ? '\t(complete)' : ''}`
    );
  }
}
