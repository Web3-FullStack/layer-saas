<script setup lang="ts">
interface Props {
  endTime?: string;
}
const { endTime = "YYYY-MM-DDTHH:mm" } = defineProps<Props>();

const { secs, mins, hrs, days, startCounting, stopCounting, isCounting, errMsg, totalDays } = $(
  useCountDown({
    source: endTime,
    callback: () => {
      console.log("target");
    },
  })
);

onMounted(startCounting);
</script>
<template>
  <div class="flex-cc space-x-2">
    <div class="flex-cc flex-col">
      <div class="font-bold text-center text-5xl w-20">
        {{ days }}
      </div>
      <div>days</div>
    </div>
    <div class="flex-cc flex-col">
      <div class="font-bold text-center text-5xl w-20">
        {{ hrs }}
      </div>
      <div>hours</div>
    </div>
    <div class="flex-cc flex-col">
      <div class="font-bold text-center text-5xl w-20">
        {{ mins }}
      </div>
      <div>min</div>
    </div>
    <div class="flex-cc flex-col">
      <div class="font-bold text-center text-5xl w-20">
        {{ secs }}
      </div>
      <div>sec</div>
    </div>
  </div>
</template>
