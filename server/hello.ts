export class HelloWorldClass {
  helloWorld(): string {
    return "Hello world!";
  }

  hello(name: string, location: string): string {
    return `Hello, ${name}! Greetings from ${location}!`;
  }
}