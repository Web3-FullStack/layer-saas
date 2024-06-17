import { ref } from 'vue'

export function useCountDown({source = 0, callback = null}) {

    let countingInterval = null

    const secs = ref(0)
    const mins = ref(0)
    const hrs = ref(0)
    const days = ref(0)
    const isCounting = ref(false)
    const errMsg = ref(null)

    const totalDays = ref(null)

    const validatingDate = (date) => {

        if(date.length === 0) {

            errMsg.value = 'date is empty'
            return false

        } else if((new Date(date)).getTime() - Date.now() < 0) {

            errMsg.value = 'date is expired'
            return false

        } else if(!(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z)$/.test(date))) {

            errMsg.value = 'date format must be YYYY-MM-DDTHH:mmZ'
            return false
            
        } else {
            
            errMsg.value = null
            return true
        }
    }
    
    const startCounting = () => {
        if( !validatingDate(source) ) return

        const unixTimeStamp = (new Date(source)).getTime()
        
        isCounting.value = true
        totalDays.value = Math.floor( Math.floor( Math.abs( Date.now() - unixTimeStamp ) / 1000 ) / (60 * 60 * 24) )

        countingInterval = setInterval(() => {
    
            const diff =  Math.floor( Math.abs( Date.now() - unixTimeStamp ) / 1000 )

            if(diff === 0){

                stopCounting()

                if(callback) callback()
                
            }
            
            secs.value = Math.floor( diff % 60 )
            mins.value = Math.floor( (diff % (60 * 60)) / 60 )
            hrs.value = Math.floor( (diff % (60 * 60 * 24)) / (60 * 60) )
            days.value = Math.floor(diff / (60 * 60 * 24))
    
        }, 1000)

    }

    const stopCounting = () => {

        clearInterval(countingInterval)

        isCounting.value = false
        secs.value = 0
        mins.value = 0
        hrs.value = 0
        days.value = 0
    }

    return { 
        secs, 
        mins, 
        hrs, 
        days, 
        startCounting, 
        stopCounting, 
        isCounting, 
        errMsg,
        totalDays
    }
}