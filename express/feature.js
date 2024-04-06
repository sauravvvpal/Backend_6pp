const gfname = "mrsrandom"
const gfname1 = "mrsrand1om"
const gfname2 = "mrsrand2om"

export const myfun = ()=>{
    return `${(~~(Math.random()*100))}%`
}

export default gfname

export {gfname1,gfname2}