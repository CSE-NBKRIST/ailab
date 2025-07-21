import React, { useState, useEffect } from 'react';
import { User, Mail, Hash, BookOpen, Key, Save, Award, Calendar, UserCheck, Plus, Users, Shield, Check, X, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { updatePassword, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc, collection, query, where, getDocs, getDoc, addDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';