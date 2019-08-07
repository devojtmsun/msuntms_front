<template>
    <div>
        <a-button type="primary" @click="showModal">
            Add New Course
        </a-button>

        <a-modal
      :visible="visible"
      title='Create a new collection'
      okText='Create'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='Title'>
          <a-input
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='Description'>
          <a-input
            type='textarea'
            v-decorator="['description']"
          />
        </a-form-item>
        <a-form-item class='collection-create-form_last-form-item'>
          <a-radio-group
            v-decorator="[
              'modifier',
              {
                initialValue: 'private',
              }
            ]"
          >
              <a-radio value='public'>Public</a-radio>
              <a-radio value='private'>Private</a-radio>
            </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
    </div>
</template>

<script>
export default {
    data () {
    return {
      visible: false,
      form: this.$form.createForm(this),
    };
  },
  methods: {
    showModal () {
        
      
      this.visible = true;
      this.$nextTick(() => {
        this.form.setFieldsValue({title: 'test'});
      });
    },
    handleCancel  () {
      this.visible = false;
    },
    handleCreate  () {
      const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
        form.resetFields();
        this.visible = false;
      });
    },
  },

}
</script>
