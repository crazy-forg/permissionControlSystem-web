<script>
const defaultForm = {
  id: '',
  username: '',
  password: '',
  name: '',
  phone: '',
  status: 1
}
export default {
  name: 'SysRole',
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: [], // 角色列表
      total: 0, // 总记录数
      pageNum: 1, // 页码
      pageSize: 10, // 每页记录数
      keyword: '',
      dialogVisible: false,
      dialogRoleVisible: false,
      sysUser: defaultForm,
      createTimes: [],
      multipleSelection: [], // 批量删除选中的记录列表
      allRoles: [], // 所有角色列表
      userRoleIds: [], // 用户的角色ID的列表
      isIndeterminate: false, // 是否是不确定的
      checkAll: false // 是否全选
    }
  },

  created() {
    this.fetchList()
  },
  methods: {
    resetData() {
      this.keyword = ''
      this.createTimes = []
      this.pageNum = 1
      this.fetchList()
    },
    async fetchList() {
      this.listLoading = true
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        username: this.keyword,
        createTimeBegin: this.createTimes[0],
        createTimeEnd: this.createTimes[1]
      }
      const { records, total } = await this.$store.dispatch('sysLoginLog/getList', params)
      this.total = total
      this.list = records
      this.listLoading = false
    },
    currentChangeHandler(current) {
      this.pageNum = current
      this.fetchList()
    }

  }
}
</script>

<template>
  <div class="app-container">
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="登录用户">
              <el-input v-model="keyword" style="width: 95%" placeholder="登录用户" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间">
              <el-date-picker
                v-model="createTimes"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="margin-right: 10px;width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchList()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;"
    >
      <el-table-column
        type="index"
        label="序号"
        width="70"
        align="center"
      />

      <el-table-column prop="username" label="登录账号" width="180" />
      <el-table-column prop="ipaddr" label="登录ip地址" width="210" />
      <el-table-column prop="msg" label="状态" />
      <el-table-column prop="createTime" label="时间" />

    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="pageNum"
      :total="total"
      :page-size="pageSize"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="currentChangeHandler"
    />

  </div>

</template>

<style scoped lang="scss">

</style>
