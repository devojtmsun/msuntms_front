<template>
    <div>
        <a-form :form="form">
            <a-form-item
                label="First Name"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'fname',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Middle Name"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'mname',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Last Name"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'lname',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Sex"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'sex',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Birth Date"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'bdate',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Contact No."
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'contact_no',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Home Address"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'home_add',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Course"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'course',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="School"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'school',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Contact No."
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'contact_no',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Required No. Hours"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'required_no_hrs',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Purpose of stay"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-textarea
                    :disabled='true'
                    v-decorator="[
                    'purpose_of_stay',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Emergency Contact First Name"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'ec_fname',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Emergency Contact Middle Name"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'ec_mname',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Emergency Contact Last Name"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'ec_lname',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Emergency Contact No."
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'ec_contact',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Emergency Contact Address"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'ec_address',
                    ]"
                />
            </a-form-item>
        </a-form>
        <a-icon type="qrcode" />
        <b>QR CODE:</b>
        <br>
        <vue-qr text="Hello Earth!" :callback="test" qid="testid"></vue-qr>
    </div>

</template>

<script>
import VueQr from 'vue-qr'
export default {
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error, $axios, $form}) {

        let trainee = await $axios.get(`/trainee/${params.id}`)
        console.log(trainee.data.data[0])
        
        return {
            trainee : trainee.data.data[0],
            // form : $form.createForm(this),
        }
    },
    data() {
        return {
            form: this.$form.createForm(this),
        }
    },
    components:{
        VueQr
    },
    mounted() {
        this.$nextTick(() => {
            this.form.setFieldsValue({fname: this.trainee.trainee_fname});
            this.form.setFieldsValue({mname: this.trainee.trainee_mname});
            this.form.setFieldsValue({lname: this.trainee.trainee_lname});
            this.form.setFieldsValue({sex: this.trainee.trainee_sex});
            this.form.setFieldsValue({bdate: this.trainee.trainee_bdate});
            this.form.setFieldsValue({contact_no: this.trainee.trainee_contact_no});
            this.form.setFieldsValue({home_add: this.trainee.trainee_home_add});
            this.form.setFieldsValue({require_no_hrs: this.trainee.require_no_hrs});
            this.form.setFieldsValue({school: this.trainee.school_name});
            this.form.setFieldsValue({course: this.trainee.course_text});
            this.form.setFieldsValue({purpose_of_stay: this.trainee.purpose_of_stay});
            this.form.setFieldsValue({ec_address: this.trainee.ECAddress});
            this.form.setFieldsValue({ec_contact: this.trainee.ECContactNumber});
            this.form.setFieldsValue({ec_fname: this.trainee.ECFName});
            this.form.setFieldsValue({ec_mname: this.trainee.ECMName});
            this.form.setFieldsValue({ec_lname: this.trainee.ECLName});
      });
    },
    methods:{
        test(dataUrl,id){
            console.log(dataUrl, id)
        }
    }
}
</script>
