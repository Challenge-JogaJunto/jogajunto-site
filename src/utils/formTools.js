export class FormTools {
  constructor(form, setForm) {
    this.form = form;
    this.setForm = setForm;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  
}
