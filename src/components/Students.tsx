@@ .. @@
   useEffect(() => {
     setupRealtimeListeners();
+    
+    return () => {
+      // Cleanup will be handled by the listeners themselves
+    };
   }, [userProfile]);

   useEffect(() => {
     filterStudents();
   }, [students, selectedSection]);

   useEffect(() => {
     if (students.length > 0) {
       setupStatsListeners();
     }
+    
+    return () => {
+      // Cleanup will be handled by the listeners themselves
+    };
   }, [students]);

+  // Add manual refresh function
+  const refreshAllData = async () => {
+    if (userProfile) {
+      console.log('Manually refreshing students data...');
+      await fetchStudents();
+      await fetchStudentStats();
+    }
+  };
+
+  // Call refresh on component mount as backup
+  useEffect(() => {
+    const timer = setTimeout(() => {
+      refreshAllData();
+    }, 1000);
+
+    return () => clearTimeout(timer);
+  }, [userProfile]);
+
   const setupRealtimeListeners = () => {