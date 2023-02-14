export default interface TopbarInterface {
  icon: Function;
  link: string;
  text: string;
  title: string;
  subtitle: string;
  patterns?: RegExp[];
}
