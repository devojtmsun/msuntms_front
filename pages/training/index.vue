<template>
    <div>
         <a-button type="primary" @click="showModal">
    Add New Training
    </a-button>
  <a-table :dataSource="data" :columns="columns" rowKey="id">
    <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" class='custom-filter-dropdown'>
      <a-input
        v-ant-ref="c => searchInput = c"
        :placeholder="`Search ${column.dataIndex}`"
        :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
        style="width: 188px; margin-bottom: 8px; display: block;"
      />
      <a-button
        type='primary'
        @click="() => handleSearch(selectedKeys, confirm)"
        icon="search"
        size="small"
        style="width: 90px; margin-right: 8px"
      >Search</a-button>
      <a-button
        @click="() => handleReset(clearFilters)"
        size="small"
        style="width: 90px"
      >Reset</a-button>
    </div>
    <a-icon slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : undefined }" />
    <template slot="customRender" slot-scope="text">
      <span v-if="searchText">
        <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
          <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</mark>
          <template v-else>{{fragment}}</template>
        </template>
      </span>
      <template v-else>{{text}}</template>
      
    </template>

    <span slot="action" slot-scope="key, record">
      <nuxt-link :to="'/training/'+ key.id">View</nuxt-link>
      <a-divider type="vertical" />
      <a @click="()=> edit(key, record)">Edit</a>
      <a-divider type="vertical" />
        <a-popconfirm
        title="Sure to delete?"
        @confirm="() => handleDelete(key)">
        <a >Delete</a>
      </a-popconfirm>
    </span>

  </a-table>

<a-modal
      v-model="visible"
      :title="modalTitle"
      onOk="handleOk"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" :title="buttonTitle" type="primary" html-type="submit" :loading="loading" @click="handleOk">
        {{buttonTitle}}        
        </a-button>
      </template>
      <a-form :form="form">
            <a-form-item
            label="Title"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'title_of_training',
                {rules: [{ required: true, message: 'Please input desired title!' }]}
                ]"
            />
           </a-form-item>
            <a-form-item
            label="Location"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-textarea
                v-decorator="[
                'location',
                {rules: [{ required: true, message: 'Please input desired location!' }]}
                ]"
            />
            </a-form-item>
            <a-form-item
                label="Duration"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12 }"
                >
                <a-range-picker 
                v-decorator="[
                'range_picker', 
                {rules: [{ type: 'array', required: true, message: 'Please select time!' }]}]" />
            </a-form-item>
        </a-form>
        <!-- <small class="form-text text-danger" v-if="errors.message.courseError">{{errors.message.courseError}}</small> -->
</a-modal>
    </div>
</template>

<script>

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
import moment from 'moment';
export default {
    async asyncData({params, error, $axios, store}) {
        try {
          let res = await $axios.get(`/trainings`)
          console.log(res)
          // cacheData = res.data.map(item => ({ ...item }))
          return {
              data: res.data.data
          }
        } catch (error) {
          console.log(error)
        }
        
    },
    data () {
    // this.cacheData = data.map(item => ({ ...item }))
    return {
      rangeConfig: {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
      },
      modalTitle : "New Training",
      buttonTitle : "New",
      id : '',
      value : '',
      buttonType: '',
      hasErrors,
      form: this.$form.createForm(this),
      count: 5,
    //   data: [],
      loading: false,
      visible: false,
      searchText: '',
      searchInput: null,
      columns: [{
        title: 'Title',
        dataIndex: 'title_of_training',
        key: 'title_of_training',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.title_of_training.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            },0)
          }
        },
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.location.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            },0)
          }
        },
      },
      {
        title: 'Start Date',
        dataIndex: 'date_from',
        key: 'date_from',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.date_from.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            },0)
          }
        },
      },
      {
        title: 'End Date',
        dataIndex: 'date_to',
        key: 'date_to',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.date_to.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            },0)
          }
        },
      },
      {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
      },
      ],
    }
  },
   beforeCreate () {
    this.form = this.$form.createForm(this);
  },

  methods: {
    moment,
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },

    showModal() {
      this.form.resetFields();
      this.visible = true;
      this.buttonType = 'add'
      this.buttonTitle ='New'
      this.modalTitle ='New Training'
    },
    async handleOk(e) {
      //ADD
      e.preventDefault();
      if(this.buttonType == 'add')
      {
        this.form.validateFields( async (err, fieldsValue) => {
        if (!err) {
          this.loading = true;
        //   console.log('Received values of form: ', fieldsValue['title_of_training']);
          const rangeValue = fieldsValue['range_picker'];
        //   console.log([rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')])
          try {
               
               let trainings = await this.$axios.post(`/trainings`,{
                   title_of_training : fieldsValue['title_of_training'],
                   location : fieldsValue['location'],
                   date_from : rangeValue[0].format('YYYY-MM-DD'),
                   date_to : rangeValue[1].format('YYYY-MM-DD')
                })
                console.log(trainings)
              
                    // this.data.push(course.data.data)
                    this.data.unshift(trainings.data.data)
                    this.$message.success(`${trainings.data.message}`);
                    this.visible = false;
                    this.loading = false;
                    this.form.resetFields();
                
          } catch (error) {
             console.log(this.$store.state.validation.errors.message)
              this.form.validateFields(['title_of_training'],{ force: true})
              this.$nextTick(() => {
                this.form.setFields({title_of_training:{value:this.form.getFieldValue('title_of_training'),errors:[new Error(this.$store.state.validation.errors.message)]}})
              });
              
              
              this.loading = false;

          }
        
        }
        });
      }//EDIT
      else{
        this.loading = true;
          this.form.validateFields( async (err, fieldsValue) => {
            try {
                console.log(this.id.id)
              const newData = [...this.data]
              const target = newData.filter(item => this.id.id === item.id)[0]
              const rangeValue = fieldsValue['range_picker'];
                let trainings = await this.$axios.post(`/trainings/${this.id.id}`,{
                        title_of_training : fieldsValue['title_of_training'],
                        location : fieldsValue['location'],
                        date_from : rangeValue[0].format('YYYY-MM-DD'),
                        date_to : rangeValue[1].format('YYYY-MM-DD')
                      })
              const currentIndex = this.data.indexOf(target);
              this.data.splice(currentIndex, 1, trainings.data.data)
              this.$message.success(`${trainings.data.message}`);
              this.visible = false;
              this.loading = false;
              this.form.resetFields();
            } catch (error) {
              console.log(error)

                this.form.validateFields(['title_of_training'],{ force: true})
                this.$nextTick(() => {
                    this.form.setFields({title_of_training:{value:this.form.getFieldValue('title_of_training'),errors:[new Error(this.$store.state.validation.errors.message)]}})
                });
              
              
              this.loading = false;
            }
          })
          
      }
      
    },
    handleCancel(e) {
      this.visible = false;
    },

    async edit(key, record){
        this.visible = true;
        this.buttonType = 'edit'
        this.buttonTitle = 'Edit'
        this.modalTitle = 'Edit Training'
        this.$nextTick(() => {
          this.form.setFieldsValue({title_of_training: record.title_of_training});
          this.form.setFieldsValue({location: record.location});
          let duration = [moment(record.date_from),moment(record.date_to)]
          console.log(duration)
          this.form.setFieldsValue({range_picker: duration});
          this.id = key
          this.value = record

      });
    },

    async handleDelete(key){
        // console.log(key)
        try {
          let course = await this.$axios.delete(`/course/${key.id}`)
          this.$message.success(`${course.data.message}`);
          const data = [...this.data]
          this.data = data.filter(item => item.id !== key.id)
          console.log(this.data)
        } catch (error) {
          console.log(error)
          this.$message.error(this.$store.state.validation.errors.message);
        }
        

    },

    courseError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('course') 
    },
  },
}
</script>
