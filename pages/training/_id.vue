<template>
    <div>
        <a-form :form="form">
            <a-form-item
                label="Title"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'title_of_training',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Location"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'location',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Start Date"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'date_from',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="End Date"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'date_to',
                    ]"
                />
            </a-form-item>
            </a-form>
            <div>
                <!-- <a-calendar @panelChange="onPanelChange" /> -->
                <full-calendar :event="training">
                </full-calendar>
            </div>
            
    </div>
</template>

<script>
import moment from 'moment';
// import Calendar from '~/components/Calendar.vue'
export default {
    components: {
        // Calendar
    },
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
        try {
            
            let training = await $axios.get(`/trainings/${params.id}`)
            console.log(training.data.data)
            return {
                training : training.data.data
            }
        } catch (error) {
            console.log(error)
        }
        
    },
    data() {
        return {
            form: this.$form.createForm(this),
        }
    },
    methods: {
        moment,
        onPanelChange(value, mode) {
            console.log(value, mode);
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.form.setFieldsValue({title_of_training: this.training.title_of_training});
            this.form.setFieldsValue({location: this.training.location});
            this.form.setFieldsValue({date_from: this.training.date_from});
            this.form.setFieldsValue({date_to: this.training.date_to});
      });
    },
}
</script>
