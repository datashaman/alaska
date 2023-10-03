class Field {
  name: string;
  type: string;
}

class Input extends Field {
  inputType?: string;
  checked?: string;
  placeholder?: string;
  value?: string;
}

class Option {
  value: string;
  text: string;
}

class Select extends Field {
  options: Option[];
  selected?: Option;
}

class Textarea extends Field {
  value: string;
}

class Panel {
  id: string;
  title: string;
  fields: Field[];
  description?: string;
}

class Form {
  id: string;
  title: string;
  method: string;
  action: string;
  description?: string;
  fields: Field[] = [];
  panels: Panel[] = [];
}
