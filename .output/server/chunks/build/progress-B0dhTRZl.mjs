import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const useProgressStore = defineStore(
  "progress",
  () => {
    const completedLessons = ref([]);
    const lessonStats = ref({});
    const houseStats = ref({});
    const totalLessonsCompleted = computed(() => completedLessons.value.length);
    function isCompleted(lessonId) {
      return completedLessons.value.includes(lessonId);
    }
    function getStats(lessonId) {
      var _a;
      return (_a = lessonStats.value[lessonId]) != null ? _a : null;
    }
    function getStars(lessonId) {
      var _a, _b;
      return (_b = (_a = lessonStats.value[lessonId]) == null ? void 0 : _a.stars) != null ? _b : 0;
    }
    function saveResult(lessonId, correct, total) {
      const pct = correct / total;
      const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : 1;
      const prev = lessonStats.value[lessonId];
      if (!prev || stars > prev.stars || stars === prev.stars && correct > prev.correct) {
        lessonStats.value[lessonId] = {
          correct,
          total,
          stars,
          completedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
      }
      if (!completedLessons.value.includes(lessonId)) {
        completedLessons.value.push(lessonId);
      }
      return stars;
    }
    function hasPerfectLesson() {
      return Object.values(lessonStats.value).some(
        (s) => s.correct === s.total
      );
    }
    function saveHouseResult(houseId, correct, total) {
      const pct = correct / total;
      const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : 1;
      const prev = houseStats.value[houseId];
      if (!prev || stars > prev.stars || stars === prev.stars && correct > prev.correct) {
        houseStats.value[houseId] = {
          correct,
          total,
          stars,
          completedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
      }
      return stars;
    }
    function isHouseCompleted(houseId) {
      return houseId in houseStats.value;
    }
    function areAllHousesCompleted(houseIds) {
      return houseIds.length > 0 && houseIds.every((id) => isHouseCompleted(id));
    }
    return {
      completedLessons,
      lessonStats,
      houseStats,
      totalLessonsCompleted,
      isCompleted,
      getStats,
      getStars,
      saveResult,
      hasPerfectLesson,
      saveHouseResult,
      isHouseCompleted,
      areAllHousesCompleted
    };
  },
  { persist: true }
);

export { useProgressStore as u };
//# sourceMappingURL=progress-B0dhTRZl.mjs.map
