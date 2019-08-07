<template>
<div style="background:#ECECEC; padding:30px">
  <a-card title="Welcome!" :bordered="false" style="width: 600px">
    <a-form
    layout="inline"
    :form="form"
    @submit="handleSubmit"
  >
    <a-form-item
      :validate-status="userNameError() ? 'error' : ''"
      :help="userNameError() || ''"
    >
      <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your username!' }]}
        ]"
        placeholder="Username"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color:rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item
      :validate-status="passwordError() ? 'error' : ''"
      :help="passwordError() || ''"
    >
      <a-input
        v-decorator="[
          'password',
          {rules: [{ required: true, message: 'Please input your Password!' }]}
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color:rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="hasErrors(form.getFieldsError())"
        :loading="loading"
      >
        Log in
      </a-button>
    </a-form-item>
    <small class="form-text text-danger" v-if="errors.username">{{errors.username[0]}}</small> 
  </a-form>
  </a-card>
</div>
</template>

<script>
function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  middleware: 'guest',
  data () {
    return {
      hasErrors,
      form: this.$form.createForm(this),
      loading: false,
    };
  },
  mounted () {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('username') && getFieldError('username');
    },
    // Only show error after a field is touched.
    passwordError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },
    async handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFields( async (err, values) => {
        if (!err) {
          this.loading = true;
          console.log('Received values of form: ', values);
          try {
             await this.$auth.login({
                  data: {
                    username: values.username,
                    password: values.password
                  }
            });
            this.loading = false;
            this.$router.push(this.$route.query.redirect ? this.$route.query.redirect : '/');
          } catch (error) {
            console.log(error)
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>