export class User {
  public last_login_date: any;
  public last_login_time: any;

  constructor(
    public id: number,
    public name: string,
    public title: string,
    public email: string,
    public password: string,
    public role: string,
    public image_path: string
  ) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.email = email;
    this.password = password;
    this.role = role;
    this.last_login_date = this.getRandomDate();
    this.last_login_time = this.getRandomTime();
    this.image_path = image_path;
  }

  getRandomDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); // Subtract 1 day

    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7); // Subtract 7 days

    const randomTimestamp =
      Math.random() * (yesterday.getTime() - last7Days.getTime()) +
      last7Days.getTime();
    const randomDate = new Date(randomTimestamp);

    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(randomDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  getRandomTime() {
    const today = new Date();
    const randomTimestamp = Math.random() * today.getTime();
    const randomDate = new Date(randomTimestamp);

    const hour = String(randomDate.getHours()).padStart(2, '0');
    const minute = String(randomDate.getMinutes()).padStart(2, '0');
    const second = String(randomDate.getSeconds()).padStart(2, '0');

    return `${hour}:${minute}:${second}`;
  }
}
