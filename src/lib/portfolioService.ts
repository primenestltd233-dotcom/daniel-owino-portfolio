import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  HeroSection, 
  AboutSection, 
  EducationItem, 
  SkillItem, 
  ProjectItem, 
  ExperienceItem, 
  CertificateItem, 
  AchievementItem, 
  LeadershipItem, 
  CVItem, 
  BlogPost, 
  ContactMessage, 
  SocialLink, 
  SiteSettings,
  MediaItem,
  FreelanceServicesSection,
  TestimonialItem
} from '../types';
import { 
  initialHero, 
  initialAbout, 
  initialEducation, 
  initialSkills, 
  initialProjects, 
  initialExperience, 
  initialCertificates, 
  initialAchievements, 
  initialLeadership, 
  initialCV, 
  initialBlogPosts, 
  initialSocials, 
  initialSiteSettings,
  initialFreelanceServices,
  initialTestimonials
} from './seedData';

// Helper function to strip `undefined` fields recursively before saving to Firestore
export function sanitizeForFirestore<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeForFirestore(item)) as unknown as T;
  }
  if (typeof data === 'object') {
    const clean: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        clean[key] = sanitizeForFirestore(value);
      }
    }
    return clean as T;
  }
  return data;
}

// Storage keys for offline or quick fallback caching
const CACHE_KEY = 'daniel_owino_portfolio_cache_v2';

export function loadCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(`${CACHE_KEY}_${key}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveCache<T>(key: string, data: T) {
  try {
    localStorage.setItem(`${CACHE_KEY}_${key}`, JSON.stringify(data));
  } catch {
    // Ignore storage quota errors
  }
}

// Global initialization flag
let isSeeded = false;

export async function ensureInitialSeed() {
  if (isSeeded || localStorage.getItem('seed_flag_v3') === 'true') {
    isSeeded = true;
    return;
  }
  isSeeded = true;
  localStorage.setItem('seed_flag_v3', 'true');

  try {
    // Check if seeding has already been performed in this Firestore database
    const seedFlagRef = doc(db, 'settings', 'seed_flag');
    const seedFlagSnap = await getDoc(seedFlagRef);
    if (seedFlagSnap.exists()) {
      return;
    }

    // Check settings doc
    const settingsRef = doc(db, 'settings', 'config');
    const settingsSnap = await getDoc(settingsRef);
    if (!settingsSnap.exists()) {
      await setDoc(settingsRef, sanitizeForFirestore(initialSiteSettings));
    }

    // Check hero doc
    const heroRef = doc(db, 'hero', 'main');
    const heroSnap = await getDoc(heroRef);
    if (!heroSnap.exists()) {
      await setDoc(heroRef, sanitizeForFirestore(initialHero));
    }

    // Check about doc
    const aboutRef = doc(db, 'about', 'main');
    const aboutSnap = await getDoc(aboutRef);
    if (!aboutSnap.exists()) {
      await setDoc(aboutRef, sanitizeForFirestore(initialAbout));
    }

    // Check education collection
    const eduSnap = await getDocs(collection(db, 'education'));
    if (eduSnap.empty) {
      for (const item of initialEducation) {
        await setDoc(doc(db, 'education', item.id), sanitizeForFirestore(item));
      }
    }

    // Check skills collection
    const skillsSnap = await getDocs(collection(db, 'skills'));
    if (skillsSnap.empty) {
      for (const item of initialSkills) {
        await setDoc(doc(db, 'skills', item.id), sanitizeForFirestore(item));
      }
    }

    // Check projects collection
    const projSnap = await getDocs(collection(db, 'projects'));
    if (projSnap.empty) {
      for (const item of initialProjects) {
        await setDoc(doc(db, 'projects', item.id), sanitizeForFirestore(item));
      }
    }

    // Check experience collection
    const expSnap = await getDocs(collection(db, 'experience'));
    if (expSnap.empty) {
      for (const item of initialExperience) {
        await setDoc(doc(db, 'experience', item.id), sanitizeForFirestore(item));
      }
    }

    // Check certificates collection
    const certSnap = await getDocs(collection(db, 'certificates'));
    if (certSnap.empty) {
      for (const item of initialCertificates) {
        await setDoc(doc(db, 'certificates', item.id), sanitizeForFirestore(item));
      }
    }

    // Check achievements collection
    const achSnap = await getDocs(collection(db, 'achievements'));
    if (achSnap.empty) {
      for (const item of initialAchievements) {
        await setDoc(doc(db, 'achievements', item.id), sanitizeForFirestore(item));
      }
    }

    // Check leadership collection
    const leadSnap = await getDocs(collection(db, 'leadership'));
    if (leadSnap.empty) {
      for (const item of initialLeadership) {
        await setDoc(doc(db, 'leadership', item.id), sanitizeForFirestore(item));
      }
    }

    // Check cv doc
    const cvRef = doc(db, 'cv', 'main');
    const cvSnap = await getDoc(cvRef);
    if (!cvSnap.exists()) {
      await setDoc(cvRef, sanitizeForFirestore(initialCV));
    }

    // Check blog collection
    const blogSnap = await getDocs(collection(db, 'blog'));
    if (blogSnap.empty) {
      for (const item of initialBlogPosts) {
        await setDoc(doc(db, 'blog', item.id), sanitizeForFirestore(item));
      }
    }

    // Check socials collection
    const socSnap = await getDocs(collection(db, 'socials'));
    if (socSnap.empty) {
      for (const item of initialSocials) {
        await setDoc(doc(db, 'socials', item.id), sanitizeForFirestore(item));
      }
    }

    // Check freelanceServices doc
    const freelanceRef = doc(db, 'freelanceServices', 'main');
    const freelanceSnap = await getDoc(freelanceRef);
    if (!freelanceSnap.exists()) {
      await setDoc(freelanceRef, sanitizeForFirestore(initialFreelanceServices));
    }

    // Mark database as seeded permanently so future reloads won't re-seed
    await setDoc(seedFlagRef, { seeded: true, timestamp: new Date().toISOString() });
  } catch (err) {
    console.warn('Firestore seed check notice:', err);
  }
}

// ---------------- SUBSCRIPTIONS & CRUD ----------------

// 1. Site Settings
export function subscribeSettings(callback: (data: SiteSettings) => void) {
  const ref = doc(db, 'settings', 'config');
  const cached = loadCache<SiteSettings>('settings');
  const initial = cached !== null ? cached : initialSiteSettings;
  callback(initial);
  saveCache('settings', initial);

  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      const data = snap.data() as SiteSettings;
      saveCache('settings', data);
      callback(data);
    }
  }, (err) => {
    console.warn('subscribeSettings notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<SiteSettings>('settings');
    callback(fallback !== null ? fallback : initialSiteSettings);
  });
}

export async function updateSettings(data: Partial<SiteSettings>) {
  const ref = doc(db, 'settings', 'config');
  const cleanData = sanitizeForFirestore(data);
  const current = loadCache<SiteSettings>('settings') || initialSiteSettings;
  const merged = { ...current, ...cleanData };
  saveCache('settings', merged);
  try {
    await setDoc(ref, cleanData, { merge: true });
  } catch (err: any) {
    console.warn('updateSettings Firestore write notice:', err?.message);
  }
}

// 2. Hero Section
export function subscribeHero(callback: (data: HeroSection) => void) {
  const ref = doc(db, 'hero', 'main');
  const cached = loadCache<HeroSection>('hero');
  const initial = cached !== null ? cached : initialHero;
  callback(initial);
  saveCache('hero', initial);

  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      const data = snap.data() as HeroSection;
      saveCache('hero', data);
      callback(data);
    }
  }, (err) => {
    console.warn('subscribeHero notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<HeroSection>('hero');
    callback(fallback !== null ? fallback : initialHero);
  });
}

export async function updateHero(data: Partial<HeroSection>) {
  const ref = doc(db, 'hero', 'main');
  const cleanData = sanitizeForFirestore(data);
  const current = loadCache<HeroSection>('hero') || initialHero;
  const merged = { ...current, ...cleanData };
  saveCache('hero', merged);
  try {
    await setDoc(ref, cleanData, { merge: true });
  } catch (err: any) {
    console.warn('updateHero Firestore write notice:', err?.message);
  }
}

// 3. About Section
export function subscribeAbout(callback: (data: AboutSection) => void) {
  const ref = doc(db, 'about', 'main');
  const cached = loadCache<AboutSection>('about');
  const initial = cached !== null ? cached : initialAbout;
  callback(initial);
  saveCache('about', initial);

  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      const data = snap.data() as AboutSection;
      saveCache('about', data);
      callback(data);
    }
  }, (err) => {
    console.warn('subscribeAbout notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<AboutSection>('about');
    callback(fallback !== null ? fallback : initialAbout);
  });
}

export async function updateAbout(data: Partial<AboutSection>) {
  const ref = doc(db, 'about', 'main');
  const cleanData = sanitizeForFirestore(data);
  const current = loadCache<AboutSection>('about') || initialAbout;
  const merged = { ...current, ...cleanData };
  saveCache('about', merged);
  try {
    await setDoc(ref, cleanData, { merge: true });
  } catch (err: any) {
    console.warn('updateAbout Firestore write notice:', err?.message);
  }
}

// 3.5 Freelance Services Section
export function subscribeFreelanceServices(callback: (data: FreelanceServicesSection) => void) {
  const ref = doc(db, 'freelanceServices', 'main');
  const cached = loadCache<FreelanceServicesSection>('freelanceServices');
  const initial = cached !== null ? cached : initialFreelanceServices;
  callback(initial);
  saveCache('freelanceServices', initial);

  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      const data = snap.data() as FreelanceServicesSection;
      saveCache('freelanceServices', data);
      callback(data);
    }
  }, (err) => {
    console.warn('subscribeFreelanceServices notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<FreelanceServicesSection>('freelanceServices');
    callback(fallback !== null ? fallback : initialFreelanceServices);
  });
}

export async function updateFreelanceServices(data: Partial<FreelanceServicesSection>) {
  const ref = doc(db, 'freelanceServices', 'main');
  const cleanData = sanitizeForFirestore(data);
  const current = loadCache<FreelanceServicesSection>('freelanceServices') || initialFreelanceServices;
  const merged = { ...current, ...cleanData };
  saveCache('freelanceServices', merged);
  try {
    await setDoc(ref, cleanData, { merge: true });
  } catch (err: any) {
    console.warn('updateFreelanceServices Firestore write notice:', err?.message);
  }
}

// 4. Education
export function subscribeEducation(callback: (items: EducationItem[]) => void) {
  const colRef = collection(db, 'education');
  const cached = loadCache<EducationItem[]>('education');
  const initial = cached !== null ? cached : initialEducation;
  callback(initial);
  saveCache('education', initial);

  return onSnapshot(colRef, (snap) => {
    const items: EducationItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as EducationItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('education', items);
    callback(items);
  }, (err) => {
    console.warn('subscribeEducation notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<EducationItem[]>('education');
    callback(fallback !== null ? fallback : initialEducation);
  });
}

export async function saveEducationItem(item: EducationItem) {
  const id = item.id || `edu_${Date.now()}`;
  const cleanItem = sanitizeForFirestore({ ...item, id });
  const cached = loadCache<EducationItem[]>('education') || [];
  const index = cached.findIndex(i => i.id === id);
  const updated = [...cached];
  if (index >= 0) updated[index] = cleanItem; else updated.push(cleanItem);
  saveCache('education', updated);
  try {
    await setDoc(doc(db, 'education', id), cleanItem, { merge: true });
  } catch (err: any) {
    console.warn('saveEducationItem Firestore write notice:', err?.message);
  }
}

export async function deleteEducationItem(id: string) {
  const cached = loadCache<EducationItem[]>('education') || [];
  const updated = cached.filter(i => i.id !== id);
  saveCache('education', updated);
  try {
    await deleteDoc(doc(db, 'education', id));
  } catch (err: any) {
    console.warn('deleteEducationItem Firestore delete notice:', err?.message);
  }
}

// 5. Skills
export function subscribeSkills(callback: (items: SkillItem[]) => void) {
  const colRef = collection(db, 'skills');
  const cached = loadCache<SkillItem[]>('skills');
  const initial = cached !== null ? cached : initialSkills;
  callback(initial);
  saveCache('skills', initial);

  return onSnapshot(colRef, (snap) => {
    const items: SkillItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as SkillItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('skills', items);
    callback(items);
  }, (err) => {
    console.warn('subscribeSkills notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<SkillItem[]>('skills');
    callback(fallback !== null ? fallback : initialSkills);
  });
}

export async function saveSkillItem(item: SkillItem) {
  const id = item.id || `sk_${Date.now()}`;
  const cleanItem = sanitizeForFirestore({ ...item, id });
  const cached = loadCache<SkillItem[]>('skills') || [];
  const index = cached.findIndex(i => i.id === id);
  const updated = [...cached];
  if (index >= 0) updated[index] = cleanItem; else updated.push(cleanItem);
  saveCache('skills', updated);
  try {
    await setDoc(doc(db, 'skills', id), cleanItem, { merge: true });
  } catch (err: any) {
    console.warn('saveSkillItem Firestore write notice:', err?.message);
  }
}

export async function deleteSkillItem(id: string) {
  const cached = loadCache<SkillItem[]>('skills') || [];
  const updated = cached.filter(i => i.id !== id);
  saveCache('skills', updated);
  try {
    await deleteDoc(doc(db, 'skills', id));
  } catch (err: any) {
    console.warn('deleteSkillItem Firestore delete notice:', err?.message);
  }
}

// 6. Projects
export function subscribeProjects(callback: (items: ProjectItem[]) => void) {
  const colRef = collection(db, 'projects');
  const cached = loadCache<ProjectItem[]>('projects');
  const initial = cached !== null ? cached : initialProjects;
  callback(initial);
  saveCache('projects', initial);

  return onSnapshot(colRef, (snap) => {
    const items: ProjectItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as ProjectItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('projects', items);
    callback(items);
  }, (err) => {
    console.warn('subscribeProjects notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<ProjectItem[]>('projects');
    callback(fallback !== null ? fallback : initialProjects);
  });
}

export async function saveProjectItem(item: ProjectItem) {
  const id = item.id || `proj_${Date.now()}`;
  const cleanItem = sanitizeForFirestore({ ...item, id });
  const cached = loadCache<ProjectItem[]>('projects') || [];
  const index = cached.findIndex(i => i.id === id);
  const updated = [...cached];
  if (index >= 0) updated[index] = cleanItem; else updated.push(cleanItem);
  saveCache('projects', updated);
  try {
    await setDoc(doc(db, 'projects', id), cleanItem, { merge: true });
  } catch (err: any) {
    console.warn('saveProjectItem Firestore write notice:', err?.message);
  }
}

export async function deleteProjectItem(id: string) {
  const cached = loadCache<ProjectItem[]>('projects') || [];
  const updated = cached.filter(i => i.id !== id);
  saveCache('projects', updated);
  try {
    await deleteDoc(doc(db, 'projects', id));
  } catch (err: any) {
    console.warn('deleteProjectItem Firestore delete notice:', err?.message);
  }
}

// 7. Work Experience
export function subscribeExperience(callback: (items: ExperienceItem[]) => void) {
  const colRef = collection(db, 'experience');
  const cached = loadCache<ExperienceItem[]>('experience');
  const initial = cached !== null ? cached : initialExperience;
  callback(initial);
  saveCache('experience', initial);

  return onSnapshot(colRef, (snap) => {
    const items: ExperienceItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as ExperienceItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('experience', items);
    callback(items);
  }, (err) => {
    console.warn('subscribeExperience notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<ExperienceItem[]>('experience');
    callback(fallback !== null ? fallback : initialExperience);
  });
}

export async function saveExperienceItem(item: ExperienceItem) {
  const id = item.id || `exp_${Date.now()}`;
  const cleanItem = sanitizeForFirestore({ ...item, id });
  const cached = loadCache<ExperienceItem[]>('experience') || [];
  const index = cached.findIndex(i => i.id === id);
  const updated = [...cached];
  if (index >= 0) updated[index] = cleanItem; else updated.push(cleanItem);
  saveCache('experience', updated);
  try {
    await setDoc(doc(db, 'experience', id), cleanItem, { merge: true });
  } catch (err: any) {
    console.warn('saveExperienceItem Firestore write notice:', err?.message);
  }
}

export async function deleteExperienceItem(id: string) {
  const cached = loadCache<ExperienceItem[]>('experience') || [];
  const updated = cached.filter(i => i.id !== id);
  saveCache('experience', updated);
  try {
    await deleteDoc(doc(db, 'experience', id));
  } catch (err: any) {
    console.warn('deleteExperienceItem Firestore delete notice:', err?.message);
  }
}

// 8. Certificates
export function subscribeCertificates(callback: (items: CertificateItem[]) => void) {
  const colRef = collection(db, 'certificates');
  const cached = loadCache<CertificateItem[]>('certificates');
  const initial = cached !== null ? cached : initialCertificates;
  callback(initial);
  saveCache('certificates', initial);

  return onSnapshot(colRef, (snap) => {
    const items: CertificateItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as CertificateItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('certificates', items);
    callback(items);
  }, (err) => {
    console.warn('subscribeCertificates notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<CertificateItem[]>('certificates');
    callback(fallback !== null ? fallback : initialCertificates);
  });
}

export async function saveCertificateItem(item: CertificateItem) {
  const id = item.id || `cert_${Date.now()}`;
  const cleanItem = sanitizeForFirestore({ ...item, id });
  const cached = loadCache<CertificateItem[]>('certificates') || [];
  const index = cached.findIndex(i => i.id === id);
  const updated = [...cached];
  if (index >= 0) updated[index] = cleanItem; else updated.push(cleanItem);
  saveCache('certificates', updated);
  try {
    await setDoc(doc(db, 'certificates', id), cleanItem, { merge: true });
  } catch (err: any) {
    console.warn('saveCertificateItem Firestore write notice:', err?.message);
  }
}

export async function deleteCertificateItem(id: string) {
  const cached = loadCache<CertificateItem[]>('certificates') || [];
  const updated = cached.filter(i => i.id !== id);
  saveCache('certificates', updated);
  try {
    await deleteDoc(doc(db, 'certificates', id));
  } catch (err: any) {
    console.warn('deleteCertificateItem Firestore delete notice:', err?.message);
  }
}

// 9. Achievements
export function subscribeAchievements(callback: (items: AchievementItem[]) => void) {
  const colRef = collection(db, 'achievements');
  const cached = loadCache<AchievementItem[]>('achievements');
  const initial = cached !== null ? cached : initialAchievements;
  callback(initial);
  saveCache('achievements', initial);

  return onSnapshot(colRef, (snap) => {
    const items: AchievementItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as AchievementItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('achievements', items);
    callback(items);
  }, (err) => {
    console.warn('subscribeAchievements notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<AchievementItem[]>('achievements');
    callback(fallback !== null ? fallback : initialAchievements);
  });
}

export async function saveAchievementItem(item: AchievementItem) {
  const id = item.id || `ach_${Date.now()}`;
  const cleanItem = sanitizeForFirestore({ ...item, id });
  const cached = loadCache<AchievementItem[]>('achievements') || [];
  const index = cached.findIndex(i => i.id === id);
  const updated = [...cached];
  if (index >= 0) updated[index] = cleanItem; else updated.push(cleanItem);
  saveCache('achievements', updated);
  try {
    await setDoc(doc(db, 'achievements', id), cleanItem, { merge: true });
  } catch (err: any) {
    console.warn('saveAchievementItem Firestore write notice:', err?.message);
  }
}

export async function deleteAchievementItem(id: string) {
  const cached = loadCache<AchievementItem[]>('achievements') || [];
  const updated = cached.filter(i => i.id !== id);
  saveCache('achievements', updated);
  try {
    await deleteDoc(doc(db, 'achievements', id));
  } catch (err: any) {
    console.warn('deleteAchievementItem Firestore delete notice:', err?.message);
  }
}

// 10. Leadership
export function subscribeLeadership(callback: (items: LeadershipItem[]) => void) {
  const colRef = collection(db, 'leadership');
  const cached = loadCache<LeadershipItem[]>('leadership');
  const initial = cached !== null ? cached : initialLeadership;
  callback(initial);
  saveCache('leadership', initial);

  return onSnapshot(colRef, (snap) => {
    const items: LeadershipItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as LeadershipItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('leadership', items);
    callback(items);
  }, (err) => {
    console.warn('subscribeLeadership notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<LeadershipItem[]>('leadership');
    callback(fallback !== null ? fallback : initialLeadership);
  });
}

export async function saveLeadershipItem(item: LeadershipItem) {
  const id = item.id || `lead_${Date.now()}`;
  const cleanItem = sanitizeForFirestore({ ...item, id });
  const cached = loadCache<LeadershipItem[]>('leadership') || [];
  const index = cached.findIndex(i => i.id === id);
  const updated = [...cached];
  if (index >= 0) updated[index] = cleanItem; else updated.push(cleanItem);
  saveCache('leadership', updated);
  try {
    await setDoc(doc(db, 'leadership', id), cleanItem, { merge: true });
  } catch (err: any) {
    console.warn('saveLeadershipItem Firestore write notice:', err?.message);
  }
}

export async function deleteLeadershipItem(id: string) {
  const cached = loadCache<LeadershipItem[]>('leadership') || [];
  const updated = cached.filter(i => i.id !== id);
  saveCache('leadership', updated);
  try {
    await deleteDoc(doc(db, 'leadership', id));
  } catch (err: any) {
    console.warn('deleteLeadershipItem Firestore delete notice:', err?.message);
  }
}

// 11. CV / Resume
export function subscribeCV(callback: (data: CVItem) => void) {
  const ref = doc(db, 'cv', 'main');
  const cached = loadCache<CVItem>('cv');
  const initial = cached !== null ? cached : initialCV;
  callback(initial);
  saveCache('cv', initial);

  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      const data = snap.data() as CVItem;
      saveCache('cv', data);
      callback(data);
    }
  }, (err) => {
    console.warn('subscribeCV notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<CVItem>('cv');
    callback(fallback !== null ? fallback : initialCV);
  });
}

export async function updateCV(data: Partial<CVItem>) {
  const ref = doc(db, 'cv', 'main');
  const cleanData = sanitizeForFirestore(data);
  const current = loadCache<CVItem>('cv') || initialCV;
  const merged = { ...current, ...cleanData };
  saveCache('cv', merged);
  try {
    await setDoc(ref, cleanData, { merge: true });
  } catch (err: any) {
    console.warn('updateCV Firestore write notice:', err?.message);
  }
}

// 12. Blog
export function subscribeBlog(callback: (items: BlogPost[]) => void) {
  const colRef = collection(db, 'blog');
  const cached = loadCache<BlogPost[]>('blog');
  const initial = cached !== null ? cached : initialBlogPosts;
  callback(initial);
  saveCache('blog', initial);

  return onSnapshot(colRef, (snap) => {
    const items: BlogPost[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as BlogPost);
    });
    items.sort((a, b) => (b.publicationDate || '').localeCompare(a.publicationDate || ''));
    saveCache('blog', items);
    callback(items);
  }, (err) => {
    console.warn('subscribeBlog notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<BlogPost[]>('blog');
    callback(fallback !== null ? fallback : initialBlogPosts);
  });
}

export async function saveBlogPost(item: BlogPost) {
  const id = item.id || `blog_${Date.now()}`;
  const cleanItem = sanitizeForFirestore({ ...item, id });
  const cached = loadCache<BlogPost[]>('blog') || [];
  const index = cached.findIndex(i => i.id === id);
  const updated = [...cached];
  if (index >= 0) updated[index] = cleanItem; else updated.push(cleanItem);
  saveCache('blog', updated);
  try {
    await setDoc(doc(db, 'blog', id), cleanItem, { merge: true });
  } catch (err: any) {
    console.warn('saveBlogPost Firestore write notice:', err?.message);
  }
}

export async function deleteBlogPost(id: string) {
  const cached = loadCache<BlogPost[]>('blog') || [];
  const updated = cached.filter(i => i.id !== id);
  saveCache('blog', updated);
  try {
    await deleteDoc(doc(db, 'blog', id));
  } catch (err: any) {
    console.warn('deleteBlogPost Firestore delete notice:', err?.message);
  }
}

// 13. Contact Messages
export function subscribeMessages(callback: (items: ContactMessage[]) => void) {
  const colRef = collection(db, 'messages');
  return onSnapshot(colRef, (snap) => {
    const items: ContactMessage[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as ContactMessage);
    });
    items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    callback(items);
  }, (err) => {
    console.warn('Messages subscription notice:', err?.message);
    callback([]);
  });
}

export async function sendContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read' | 'archived'>) {
  const colRef = collection(db, 'messages');
  const newDoc: Omit<ContactMessage, 'id'> = sanitizeForFirestore({
    ...msg,
    createdAt: new Date().toISOString(),
    read: false,
    archived: false,
  });
  try {
    await addDoc(colRef, newDoc);
  } catch (err: any) {
    console.warn('sendContactMessage notice:', err?.message);
  }
}

export async function updateMessageStatus(id: string, updates: Partial<ContactMessage>) {
  try {
    await updateDoc(doc(db, 'messages', id), sanitizeForFirestore(updates));
  } catch (err: any) {
    console.warn('updateMessageStatus notice:', err?.message);
  }
}

export async function deleteMessage(id: string) {
  try {
    await deleteDoc(doc(db, 'messages', id));
  } catch (err: any) {
    console.warn('deleteMessage notice:', err?.message);
  }
}

// 14. Social Links
export function subscribeSocials(callback: (items: SocialLink[]) => void) {
  const colRef = collection(db, 'socials');
  const cached = loadCache<SocialLink[]>('socials');
  const initial = cached !== null ? cached : initialSocials;
  callback(initial);
  saveCache('socials', initial);

  return onSnapshot(colRef, (snap) => {
    const items: SocialLink[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as SocialLink);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('socials', items);
    callback(items);
  }, (err) => {
    console.warn('subscribeSocials notice (using offline/cache fallback):', err?.message);
    const fallback = loadCache<SocialLink[]>('socials');
    callback(fallback !== null ? fallback : initialSocials);
  });
}

export async function saveSocialLink(item: SocialLink) {
  const id = item.id || `soc_${Date.now()}`;
  const cleanItem = sanitizeForFirestore({ ...item, id });
  const cached = loadCache<SocialLink[]>('socials') || [];
  const index = cached.findIndex(i => i.id === id);
  const updated = [...cached];
  if (index >= 0) updated[index] = cleanItem; else updated.push(cleanItem);
  saveCache('socials', updated);
  try {
    await setDoc(doc(db, 'socials', id), cleanItem, { merge: true });
  } catch (err: any) {
    console.warn('saveSocialLink Firestore write notice:', err?.message);
  }
}

export async function deleteSocialLink(id: string) {
  const cached = loadCache<SocialLink[]>('socials') || [];
  const updated = cached.filter(i => i.id !== id);
  saveCache('socials', updated);
  try {
    await deleteDoc(doc(db, 'socials', id));
  } catch (err: any) {
    console.warn('deleteSocialLink Firestore delete notice:', err?.message);
  }
}

// 15. Media Library
export function subscribeMedia(callback: (items: MediaItem[]) => void) {
  const colRef = collection(db, 'media');
  return onSnapshot(colRef, (snap) => {
    const items: MediaItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as MediaItem);
    });
    items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    callback(items);
  }, (err) => {
    console.warn('subscribeMedia notice:', err?.message);
    callback([]);
  });
}

export async function saveMediaItem(item: MediaItem) {
  const id = item.id || `med_${Date.now()}`;
  const cleanItem = sanitizeForFirestore({ ...item, id });
  try {
    await setDoc(doc(db, 'media', id), cleanItem, { merge: true });
  } catch (err: any) {
    console.warn('saveMediaItem notice:', err?.message);
  }
}

export async function deleteMediaItem(id: string) {
  try {
    await deleteDoc(doc(db, 'media', id));
  } catch (err: any) {
    console.warn('deleteMediaItem notice:', err?.message);
  }
}

// 16. Testimonials Management
export function subscribeTestimonials(callback: (items: TestimonialItem[]) => void) {
  const colRef = collection(db, 'testimonials');
  return onSnapshot(colRef, (snap) => {
    const items: TestimonialItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as TestimonialItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('testimonials', items);
    callback(items);
  }, (err) => {
    console.warn('subscribeTestimonials notice (using fallback):', err?.message);
    const fallback = loadCache<TestimonialItem[]>('testimonials');
    callback(fallback !== null ? fallback : initialTestimonials);
  });
}

export async function saveTestimonialItem(item: TestimonialItem) {
  const id = item.id || `test_${Date.now()}`;
  const cleanItem = sanitizeForFirestore({ ...item, id });
  const cached = loadCache<TestimonialItem[]>('testimonials') || [];
  const index = cached.findIndex(i => i.id === id);
  const updated = [...cached];
  if (index >= 0) updated[index] = cleanItem; else updated.push(cleanItem);
  saveCache('testimonials', updated);
  try {
    await setDoc(doc(db, 'testimonials', id), cleanItem, { merge: true });
  } catch (err: any) {
    console.warn('saveTestimonialItem Firestore write notice:', err?.message);
  }
}

export async function deleteTestimonialItem(id: string) {
  const cached = loadCache<TestimonialItem[]>('testimonials') || [];
  const updated = cached.filter(i => i.id !== id);
  saveCache('testimonials', updated);
  try {
    await deleteDoc(doc(db, 'testimonials', id));
  } catch (err: any) {
    console.warn('deleteTestimonialItem Firestore delete notice:', err?.message);
  }
}
