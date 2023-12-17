export class Task {
    id;
    title;
    description;
    createdAt;
    concluded;
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.createdAt = new Date();
        this.concluded = false;
    }
}
