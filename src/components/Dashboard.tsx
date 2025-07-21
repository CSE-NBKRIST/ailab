@@ .. @@
   useEffect(() => {
     if (userProfile) {
       setupRealtimeStatsListeners();
     }
+    
+    return () => {
+      // Cleanup will be handled by the listeners themselves
+    };
   }, [userProfile]);

   const setupRealtimeStatsListeners = () => {
@@ .. @@
     }
   };

+  // Add a manual refresh function for dashboard
+  const refreshDashboard = async () => {
+    if (userProfile) {
+      console.log('Manually refreshing dashboard data...');
+      if (userProfile.role === 'faculty') {
+        const targetFacultyId = userProfile.primaryFacultyId || userProfile.uid;
+        await fetchFacultyStats(targetFacultyId);
+      } else {
+        await fetchStudentStats();
+      }
+    }
+  };
+
+  // Call refresh on component mount as backup
+  useEffect(() => {
+    const timer = setTimeout(() => {
+      refreshDashboard();
+    }, 1000); // Delay to ensure other data is loaded first
+
+    return () => clearTimeout(timer);
+  }, [userProfile]);
+
   const setupFacultyStatsListeners = (targetFacultyId: string) => {