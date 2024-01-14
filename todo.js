// your commands in here
const Controller = require('./controller/controller.js')

const argv = process.argv.slice(2)

if (argv.length === 0) {
    Controller.help()
} else {
    switch (argv[0].toLowerCase()) {
        case 'help':
            Controller.help()
            break
        case 'list':
            Controller.list()
            break
        case 'add':
            let newTask = argv.slice(1).join(' ')
            Controller.add(newTask)
            break
        case 'findbyid':
            Controller.findByid(+argv[1])
            break
        case 'delete':
            Controller.delete(+argv[1])
            break
        case 'complete':
            Controller.complete(+argv[1])
            break
        case 'uncomplete':
            Controller.uncomplete(+argv[1])
            break
        case 'list:created':
            let sortDate = 'asc' // the order of the first task input by the user, karena yg lama bisa saja terlupakan
            if (argv.length > 1) {
                if (argv[1].toLowerCase() === 'asc') {
                    sortDate = 'asc'
                } else if (argv[1].toLowerCase() === 'desc') {
                    sortDate = 'desc'
                }
            }
            Controller.listCreated(sortDate)
            break
        case 'list:complete':
            let sortComplete = 'asc' // the order of the first task input by the user, karena yg lama bisa saja terlupakan
            if (argv.length > 1) {
                if (argv[1].toLowerCase() === 'asc') {
                    sortComplete = 'asc'
                } else if (argv[1].toLowerCase() === 'desc') {
                    sortComplete = 'desc'
                }
            }
            Controller.listComplete(sortComplete)
            break
        case 'tag':
            let id = +argv[1]
            let tags = argv.slice(2)
            Controller.tag(id, tags)
            break
        case 'filter':
            Controller.filterBy(argv[2])
            break
        default:
            console.log("Unknown command: " + argv[0])
            break
    }
}

/* 
Release 3: Optimize Your Learning
Ingat dan perhatikan prinsip single responsibility serta separation of concerns.

Saat bekerja, perhatikan bagaimana perubahan struktur berdampak pada aplikasi kita secara keseluruhan. Ketika fitur baru ditambahkan, berapa banyak baris kode yang harus kita ubah? Seberapa sulitnya melakukan perubahan itu? Bagaimana tingkat coupling dan cohesion-nya? Ingat kembali prinsip orthogonality dan law of demeter.

JAWABAN = 
1. berapa banyak baris kode yang harus kita ubah? Tergantung fitur yang ingin ditambahkan. Jika fiturnya adalah fitur besar maka banyak juga code yang akan ditambahkan
2. Seberapa sulitnya melakukan perubahan itu? Tergantung fitur yang ingin ditambahkan
3. Bagaimana tingkat coupling dan cohesion-nya? Tingkat coupling dan cohesion dalam desain perangkat lunak saya telah dijaga dengan baik. saya berusaha untuk meminimalkan ketergantungan antara komponen-komponen dan memastikan bahwa setiap komponen memiliki fokus tugas yang jelas.

*/