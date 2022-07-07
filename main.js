let data = window.localStorage.getItem('nodemy')

if(!data){
    window.localStorage.setItem('nodemy', '[]')
    data = []
}else{
    data = JSON.parse(data)
}


// push data của đề bài vào local
let dataex = [
    {note: 'làm bài tập', deadline: (new Date('2022/10/2')).toLocaleDateString(), priority: '1', done: 1},
    {note: 'làm bài tập', deadline: (new Date('2022/10/2')).toLocaleDateString(), priority: '3', done: 2},
    {note: 'làm bài tập', deadline: (new Date('2022/10/2')).toLocaleDateString(), priority: '2', done: 2},
    ]
    
data = dataex

render()

function add(){
    const note = $('#note').val()
    const deadline = $('#deadline').val()
    const priority = $('#priority').val()
    const done = $('#done').val()

    if(!note || !deadline || !priority || !done) return alert('Không bỏ trống thông tin')

    data.push({note:note,deadline:(new Date(deadline)).toLocaleDateString(), priority: priority, done: done})

    window.localStorage.setItem('nodemy', JSON.stringify(data))

    $('.closeModal').trigger('click')
    render()
}

function render(){

    // Lấy ngày hiện tại để so sánh
    var now = (new Date()).toLocaleDateString().split('/')
    if(now[0] < 10){
        now[0] = 0 + now[0]
    }
    if(now[1] < 10){
        now[1] = 0 + now[1]
    }
    var dateNow = (now[0]+'/'+ now[1]+'/'+now[2]).split('/').reverse().join('/')
    // console.log(44,dateNow);


    $('.listData').html('')
    let day = ''
    let month = ''
    let year = ''
    let newDate
    data.map(function(value,i){

        // Thêm số 0 vào trước ngày tháng bé hơn 10 để so sánh 
        day = value.deadline.split('/')[0]
        month = value.deadline.split('/')[1]
        year = value.deadline.split('/')[2]
        if(day < 10){
            day = 0 + day
        }
        if(month < 10){
            month = 0 + month
        }

        newDate = day+'/' + month + '/'+ year
        // console.log(newDate);

        // console.log(day, month);
        $('.listData').append(`
        <div class='data data${i}' data-bs-toggle="modal" data-bs-target="#exampleModal">
            note: ${value.note} <br/>
            deadline: ${newDate} <br/>
            priority: ${value.priority} <br/>
            done: ${value.done} <br/>
        </div>
        `)


        $(`.data${i}`).on('click', function(){
            index = i
        })
        // console.log(69,dateNow);
        // console.log(newDate.split('/').reverse().join('/'));

        // console.log(dateNow < newDate.split('/').reverse().join('/'));
        if(value.done == 1){
            $(`.data${i}`).addClass('done')
            
        }else if(dateNow > newDate.split('/').reverse().join('/')){
            $(`.data${i}`).addClass('false')
        }


    })
}


function update(){
    const note = $('#note').val()
    const deadline = $('#deadline').val()
    const priority = $('#priority').val()
    const done = $('#done').val()

    if(!note || !deadline || !priority || !done) return alert('Hãy điền đủ thông tin')

    data[index] = {note:note,deadline:(new Date(deadline)).toLocaleDateString(), priority: priority, done: done}

    window.localStorage.setItem('nodemy', JSON.stringify(data))
    render()
}


function deleteData(){
    data.splice(index,1)
    window.localStorage.setItem('nodemy', JSON.stringify(data))
    render()
}


function sort(){
    const sortvalue = $('#sort').val()
    if(sortvalue == 0){
        render()
    }else if(sortvalue == 1){
        $('.listData').html('')
        data.sort(function(af, be){
            // console.log(af.deadline,be.deadline);
            if(af.deadline.split('/').reverse().join('/') > be.deadline.split('/').reverse().join('/')){
                return -1
            }
        })
        console.log(data);
        data.map(function(value,i){
            $('.listData').append(`
            <div class='data data${i}' data-bs-toggle="modal" data-bs-target="#exampleModal">
                note: ${value.note} <br/>
                deadline: ${value.deadline} <br/>
                priority: ${value.priority} <br/>
                done: ${value.done} <br/>
            </div>
            `)

        })
    }else if(sortvalue == 2){
        data.sort(function(af,be){
            if(af.priority < be.priority){
                return - 1
            }
        })
        $('.listData').html('')
        data.map(function(value,i){
            $('.listData').append(`
            <div class='data data${i}' data-bs-toggle="modal" data-bs-target="#exampleModal">
                note: ${value.note} <br/>
                deadline: ${value.deadline} <br/>
                priority: ${value.priority} <br/>
                done: ${value.done} <br/>
            </div>
            `)
        })
    }
}