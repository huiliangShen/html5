function search(list) {
    for(let i in list) {
        let item = list[i]
        console.log(`vaule:${item.value}`)
        if(item.child && item.child.length > 0) {
            search(item.child)
        }
    }
}

var objs = [
    {
        value: 1,
        child: [
            {
                value:2,
                child: [
                    {
                        value:3
                    }
                ]
            },
            {
                value: 4
            }
        ]
    }
]
search(objs)