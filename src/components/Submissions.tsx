@@ .. @@
   useEffect(() => {
     setupRealtimeListeners();
+    
+    return () => {
+      // Cleanup will be handled by the listeners themselves
+    };
   }, [userProfile]);

   useEffect(() => {
     filterSubmissions();
   }, [submissions, selectedExperiment, filter]);

+  // Add manual refresh function
+  const refreshSubmissions = async () => {
+    if (userProfile) {
+      console.log('Manually refreshing submissions data...');
+      const targetFacultyId = userProfile.primaryFacultyId || userProfile.uid;
+      await fetchStaticData(targetFacultyId);
+    }
+  };
+
+  // Call refresh on component mount as backup
+  useEffect(() => {
+    const timer = setTimeout(() => {
+      refreshSubmissions();
+    }, 1000);
+
+    return () => clearTimeout(timer);
+  }, [userProfile]);
+
   const setupRealtimeListeners = async () => {