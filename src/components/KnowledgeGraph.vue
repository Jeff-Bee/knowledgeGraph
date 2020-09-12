<template>
	<div class="container">
        <div class="center">
            <div class="header">
                <input
                    type="text"
                    class="ipt"
                    v-model="searchContent"
                    @keydown.enter="search()"
                    placeholder="搜索盗墓笔记重启试试"
                />
                <p class="tips">
                    <span>搜索示例:盗墓笔记重启</span>
                </p>
            </div>
            <div class="canvas">
                <Keywords v-show="type === 1" @searchData="search" @windowResize="windowResize"></Keywords>
                <Charts ref="charts" v-show="type === 2" :chartList="searchList" />
                
            </div>
        </div>
	</div>
</template>
<script>
import Keywords from "./Keywords";
import Charts from "./Charts";
import{
    search,
} from './mock'
export default {
	name: "KnowledgeGraph",
	components: {
		Keywords,
		Charts,
	},
    mixins: [],
	props: {},
	data() {
		return {
			searchContent: "",
			type: 1,
			searchList: [],
		};
	},
	computed: {},
	methods: {
        /**
         * 搜索方法,text为空则为点击类别操作,不为空则为输入框搜索
         */
		async search(text) {
			text || (text = this.searchContent);
            console.log("sss", text, this.searchContent);
            if(!text){
                this.type = 1
                return
            }
            try {
                let result = await search(text);
                this.type = 2
                this.searchList = [].concat(result)
            } catch (error) {
                alert('未查询到数据,请更改查询条件')
            }
			
        },
        /**
         * 窗体大小变化回调
         */
        windowResize(){
            const charts = this.$refs.charts
            charts&&charts.myChart&&charts.myChart.resize()
        }
	},
	created() {},
	mounted() {
		this.type = 1;
	},
	beforeDestroy() {},
};
</script>
<style scoped>
.container {
	overflow: hidden;
	position: relative;
    min-height: 100vh;
}
.canvas {
    margin-top: 10px;
	height: calc(100vh - 110px);
}
.center {
	position: relative;
	min-width: 1200px;
	margin: 0 auto;
    width: 85%;
}
.header {
	padding-top: 30px;
}
.ipt {
	border: 1px solid #9093c7;
	border-radius: 20px;
	width: 374px;
	height: 44px;
	line-height: 44px;
	box-sizing: border-box;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
}

.tips {
	font-size: 14px;
	color: #ccc;
	line-height: 17px;
	margin-top: 5px;
}
</style>