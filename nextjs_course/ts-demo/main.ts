type ButtonProps = {
    color: string;
    text: string | { toString: () => string };
} & (
    | { variant: "outline"; borderWidth?: number; } 
    | { variant: "contain"; opacity?: number; }
    | { variant?: never }
);

function buildButton(props?: ButtonProps) {
    // build button implementation
}

// Valid calls
buildButton();
buildButton({ variant: 'contain', color: '#4466ee', text: 'hello' });
buildButton({ variant: 'contain', color: '#4466ee', opacity: 0.6, text: 20 });
buildButton({ variant: 'outline', color: '#4466ee', text: 'hi' });
buildButton({
  variant: 'outline',
  color: '#4466ee',
  borderWidth: 2,
  text: 'lorem',
});
const person = {
  firstName: 'Somchai',
  lastName: 'Somset',
  toString() {
    return `${this.firstName} ${this.lastName}`;
  },
};
buildButton({ color: '#55ee11', text: person });

// These should cause TypeScript errors:
// buildButton({ color: 'red' }); // Missing 'text' property
// buildButton({ color: 'red', text: 'Lorem', variant: 'capybara' }); // Invalid variant
// buildButton({
//   color: 'green',
//   text: 'Hi',
//   variant: 'outline',
//   borderWidth: 3,
//   opacity: 1, // Error: 'opacity' not allowed with 'outline' variant
// });