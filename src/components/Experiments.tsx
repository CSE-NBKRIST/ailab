@@ .. @@
   useEffect(() => {
     fetchExperiments();
     if (userProfile?.role === 'student') {
       setupRealtimeListeners();
     }
     
-    // Cleanup function
     return () => {
-      // Cleanup will be handled by the listeners themselves
+      // Cleanup will be handled by the listeners themselves  
     };
   }, [userProfile]);

+  // Add manual refresh for experiments
+  const refreshExperiments = async () => {
+    if (userProfile) {
+      console.log('Manually refreshing experiments data...');
+      await fetchExperiments();
+      if (userProfile.role === 'student') {
+        await fetchSubmissions();
+        await fetchVivaAttempts();
+        await fetchStudentRecords();
+      }
+    }
+  };
+
+  // Call refresh on component mount as backup
+  useEffect(() => {
+    const timer = setTimeout(() => {
+      refreshExperiments();
+    }, 1000);
+
+    return () => clearTimeout(timer);
+  }, [userProfile]);
+
   const setupRealtimeListeners = () => {