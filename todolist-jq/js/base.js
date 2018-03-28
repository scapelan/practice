var myTodoModule = (function(){
    var task_list = [];
    var task_list,$content,$addTaskSubmit,$task_detail,$task_content,$desc,$datetime,$detail_submit,$delete;
    var detailIndex,deleteIndex;
    // 初始化jquery对象
    var initJqVar = function(){
        $task_list = $('.task-list');
        $content = $('.content');
        $addTaskSubmit = $('.addTaskSubmit');
		$task_detail = $('.task-detail');  
		$task_content= $('.detail-content'); 
		$desc = $('.desc');
		$datetime = $('.datetime');
		$detail_submit = $('.detail-submit');
		$delete = $('.delete');
    }
    // 从store.js里取出数据
    var initRenderIndex = function(){
        $task_list.html('');
        task_list = store.get('task_list');
        var taskHtmlStr = '';
        // 遍历task_list
        for(var i = task_list.length-1;i>=0;i--){
            var oneItem = '<div class="task-item">' +
            '<span><input type="checkbox"></span>' +
            '<span class="item-content">' +  task_list[i].content + 
            '</span><span class="fr">' +
            '<span class="action detail">详情</span>' +
            '<span class="action delete">删除</span>' +
            '</span></div>';
            taskHtmlStr = taskHtmlStr + oneItem;
        }
        $(taskHtmlStr).appendTo($task_list);
        listenDetail();
        listenDelete();
    }
    // 添加taskItem
    var addTask = function(){
        var new_task = {};
        new_task.content = $content.val();//获取输入框的内容
        task_list.push(new_task);
        store.set('task_list',task_list);
        renderOneItem(new_task);
    }
    var renderOneItem = function(new_task){
        var oneItem = '<div class="task-item">' +
            '<span><input type="checkbox"></span>' +
            '<span class="item-content">' +  new_task.content + 
            '</span><span class="fr">' +
            '<span class="action detail">详情</span>' +
            '<span class="action delete">删除</span>' +
            '</span></div>';
        $(oneItem).prependTo($task_list);
        $content.val('');
        listenDetail();
        listenDelete();   
    }
    var listenAddTaskItem = function(){
        $addTaskSubmit.click(function(){
            addTask();
        })
    }
    var listenDetail = function(){
        $('.detail').click(function(){
            detailIndex = task_list.length - 1 - $(this).parent().parent().index();
            $task_detail.show();
            $task_content.val(task_list[detailIndex].content);
            $desc.val(task_list[detailIndex].desc);
            $datetime.val(task_list[detailIndex].datetime);
        })
    }
    var listenDetailSave = function(){
        $detail_submit.click(function(){
            var dataTask = {};
            dataTask.content = $task_content.val();
            dataTask.desc = $desc.val();
            dataTask.datetime = $datetime.val();
            task_list[detailIndex] = $.extend(task_list[detailIndex],dataTask);
            store.set('task_list',task_list);
			$task_content.val('');
			$desc.val('');
			$datetime.val('');
			$task_detail.hide();
			initRenderIndex();
        })
    }
    var listenDelete = function(){
        $('.delete').click(function(){
			deleteIndex = task_list.length - 1 - $(this).parent().parent().index();
			var r =  confirm('确认要删除吗？真的要删除吗？');
			if(r){
				task_list.splice(deleteIndex,1);//第一个是索引，第二个是个数
				$(this).parent().parent().remove();
			}
		});
    }
    var initModule = function(){
        // store.set('task_list',task_list);
        initJqVar();
        $datetime.datetimepicker();
        initRenderIndex();
        listenAddTaskItem();//添加任务列表监听事件
		listenDetail();
		listenDetailSave();
		listenDelete();
    }

    return {
        initModule:initModule
    }




})();

//在DOM加载完成时调用
$(function(){
    myTodoModule.initModule();
});   