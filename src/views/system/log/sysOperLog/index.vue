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
      title: '',
      operName:'',
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
        title: this.title,
        operName: this.operName,
        createTimeBegin: this.createTimes[0],
        createTimeEnd: this.createTimes[1]
      }
      const { records, total } = await this.$store.dispatch('sysOperLog/getList', params)
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
            <el-form-item label="操作模块">
              <el-input v-model="title" style="width: 95%" placeholder="操作模块" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作人">
              <el-input v-model="operName" style="width: 95%" placeholder="操作人" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作时间">
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

      <el-table-column prop="title" label="系统模块" width="100" />
      <el-table-column prop="businessType" label="操作类型" width="110" />
      <el-table-column prop="requestMethod" label="请求方式" />
      <el-table-column prop="operName" label="操作人员" />
      <el-table-column prop="operIp" label="操作IP" />
      <el-table-column prop="method" label="请求方法" width="200"/>

      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1">成功</span>
          <span v-else>失败</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="操作时间" width="160" />

      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" title="详情" @click="editHandler(scope.row)" />
        </template>
      </el-table-column>
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
