import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MessageSquare, Upload, FileText, Download, AlertCircle, Check, X, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { VivaQuestion, Experiment } from '../types';

  useEffect(() => {
    fetchExperiments();
    return () => {
      // Cleanup if needed
    };
  }, [userProfile]);

  useEffect(() => {
    if (selectedExperiment) {
      fetchQuestions();
    }
    return () => {
      // Cleanup if needed
    };
  }, [selectedExperiment]);

  useEffect(() => {
    // Setup real-time listeners for experiments
    if (userProfile) {
      setupRealtimeListeners();
    }
  }, [userProfile]);

  const setupRealtimeListeners = () => {
    if (!userProfile) return;

    const targetFacultyId = userProfile.primaryFacultyId || userProfile.uid;

    // Real-time experiments listener
    const experimentsQuery = query(
      collection(db, 'experiments'),
      where('facultyId', '==', targetFacultyId)
    );
    
    const unsubscribeExperiments = onSnapshot(experimentsQuery, (snapshot) => {
      const experimentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Experiment[];
      setExperiments(experimentsData);
      console.log('Real-time update: Experiments updated in VivaQuestions');
    });

    // Real-time questions listener for selected experiment
    if (selectedExperiment) {
      const questionsQuery = query(
        collection(db, 'vivaQuestions'),
        where('experimentId', '==', selectedExperiment)
      );
      
      const unsubscribeQuestions = onSnapshot(questionsQuery, (snapshot) => {
        const questionsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as VivaQuestion[];
        setQuestions(questionsData);
        console.log('Real-time update: Questions updated in VivaQuestions');
      });

      return () => {
        unsubscribeExperiments();
        unsubscribeQuestions();
      };
    }

    return () => {
      unsubscribeExperiments();
    };
  };

  const fetchExperiments = async () => {