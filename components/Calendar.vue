<template>
   
    <div>
        <FullCalendar 
        ref="fullCalendar"
        defaultView="dayGridMonth" 
        :plugins="calendarPlugins" 
        @dateClick="handleDateClick"
        @eventClick="handleClickEvent"
        :events="calendarEvents"
        :selectable="true"
        @select="handleSelectClick"
        :validRange="{
            start: start,
            end: end
        }"
        time-zone='local'
        :allDay="false"
        nextDayThreshold='00:00:00'
        />
        <a-modal
            :title="modalTitle"
            v-model="visible"
            >
            <template slot="footer">
            <a-button @click="handleView" v-if="buttonType == 'edit'">Attendance</a-button>
            <a-button key="back" @click="handleCancel">Cancel</a-button>
            <a-button key="submit" :title="modalButton" type="primary" html-type="submit" :loading="loading" @click="handleOk">
            {{modalButton}}        
            </a-button>
        </template>
            <a-form :form="form">
                <a-form-item
                    label="Title"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 8 }"
                    
                    >
                    <a-input
                        v-decorator="[
                        'attendance_title',
                         {rules: [{ required: true, message: 'Please input the title!' }]}
                        ]"
                    />
                    
                </a-form-item>
                <a-form-item
                    label="Start Time"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 8 }"
                >
                    <a-time-picker use12Hours format="h:mm A" @change="onChange" 
                        v-decorator="[
                        'start_time', 
                        {rules: [{ required: true, message: 'Please select start time!' }]}]"
                    />
                </a-form-item>
                <a-form-item
                    label="End Time"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 8 }"
                >
                    <a-time-picker use12Hours format="h:mm A" @change="onChange" 
                        v-decorator="[
                        'end_time', 
                        {rules: [{ required: true, message: 'Please select end time!' }]}]"
                    />
                </a-form-item>
                </a-form>
            </a-modal>
    </div>
</template>

<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
    import moment from 'moment'
    export default {
        props : {
            event : Object
        },
        components: {
            FullCalendar // make the <FullCalendar> tag available
        },
        data() {
            return {
                calendarPlugins: [ dayGridPlugin,interactionPlugin ],
                calendarEvents: [ // initial event data
                    { id: 1, title: 'Event Now', start: this.event.date_from }
                ],
                droppable: true,
                draggable: true,
                start : this.event.date_from,
                end : moment(this.event.date_to).add(1,'days').format('YYYY-MM-DD'),
                visible: false,
                form: this.$form.createForm(this),
                modalTitle : 'New Attendance Event',
                modalButton : 'Save',
                buttonType: 'add',
                loading: false,
                clickedDate: '',
                id: '',
            }
        },
        methods: {
            moment,
            handleDateClick(arg) {
               
                this.visible = true
                console.log(arg.date)
                this.clickedDate = arg
                // this.calendarEvents.push({
                //             title: 'Test', 
                //             start: arg.date,
                //             // end: fieldsValue.end_time.format('YYYY-MM-DD','h:mm A'),
                //             })
            
            },
            handleSelectClick(arg){
                // alert(arg)
                console.log(arg)

            },
            handleOk(e) {
                e.preventDefault();
                this.loading = true
                if(this.buttonType == 'add')
                {
                    this.form.validateFields( async (err, fieldsValue) => {
                        if(!err){
                            console.log(fieldsValue)
                            
                            let start = moment(this.clickedDate.dateStr)
                            let time = moment(fieldsValue.start_time)
                            console.log(time.get('hour'))
                            start.set({hour: fieldsValue.start_time.get('hour'), minute: fieldsValue.start_time.get('minute')} )
                            console.log(start)
                            this.calendarEvents.push({
                                title: fieldsValue.attendance_title, 
                                start: start._d,
                                // end: fieldsValue.end_time.format('YYYY-MM-DD','h:mm A'),
                                })
                                console.log(this.calendarEvents)
                                this.form.resetFields();
                            this.visible = false
                        }
                    })
                }
                else{

                }
                
            },
            handleCancel(e) {
                this.visible = false;
            },
            handleClickEvent(arg){
                console.log(arg.event)
                this.visible = true;
                this.buttonType = 'edit'
                this.buttonTitle = 'Edit'
                this.modalTitle = 'Edit Event Details'
                this.$nextTick(() => {
                    this.form.setFieldsValue({attendance_title: arg.event.title});
                    this.form.setFieldsValue({start_time: moment(arg.event.start)});
                    this.form.setFieldsValue({end_time:  moment(arg.event.end)});

                });
                this.id = arg.event.id
            },
            onChange(time, timeString){
                console.log(timeString)
            },
            handleView(){
                this.$router.push({path:`/training/attendance/${this.id}`})
            }
        },
        mounted() {
            console.log(this.event)
            // console.log( moment(this.event.date_from) )
            // let end = moment(this.event.date_to).add(1,'days').format('YYYY-MM-DD');
            // console.log(end)

        },
    }
</script>

<style lang='scss'>

@import '@fullcalendar/core/main.css';
@import '@fullcalendar/daygrid/main.css';

</style>