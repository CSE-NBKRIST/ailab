@@ .. @@
   useEffect(() => {
     setupRealtimeListeners();
+    
+    return () => {
+      // Cleanup will be handled by the listeners themselves
+    };
   }, [userProfile]);

   useEffect(() => {
     filterRecords();
   }, [records, selectedExperiment, statusFilter, searchTerm]);

+  // Add manual refresh function
+  const refreshRecords = async () => {
+    if (userProfile) {
+      console.log('Manually refreshing records data...');
+      const targetFacultyId = userProfile.primaryFacultyId || userProfile.uid;
+      await fetchStaticData(targetFacultyId);
+      await rebuildRecords(targetFacultyId);
+    }
+  };
+
+  // Call refresh on component mount as backup
+  useEffect(() => {
+    const timer = setTimeout(() => {
+      refreshRecords();
+    }, 1000);
+
+    return () => clearTimeout(timer);
+  }, [userProfile]);
+
   const setupRealtimeListeners = async () => {