import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Program = 'morning' | 'evening' | null;
export type Field = 'CS' | 'SE' | null;
export type UserRole = 'student' | 'faculty' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  field: Field;
  program: Program;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  program: Program;
  field: Field;
  author: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'notes' | 'assignment' | 'past-paper';
  subject: string;
  program: Program;
  field: Field;
  downloadUrl: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  semester: number;
  field: Field;
}

export interface TimetableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  room: string;
  instructor: string;
}

interface AppContextType {
  selectedProgram: Program;
  setSelectedProgram: (program: Program) => void;
  selectedField: Field;
  setSelectedField: (field: Field) => void;
  token: string | null;
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  resources: Resource[];
  timetable: TimetableEntry[];
  courses: Course[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const AUTH_TOKEN_KEY = 'ubit_auth_token';

// Mock data
const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Mid-Term Examination Schedule Released',
    content: 'The mid-term examination schedule for Fall 2024 has been released. Please check the notice board for details.',
    date: '2024-12-20',
    program: 'morning',
    field: 'CS',
    author: 'Dr. Ahmed Khan',
  },
  {
    id: '2',
    title: 'Software Engineering Workshop',
    content: 'A workshop on Agile Development Practices will be held next week. All SE students are encouraged to attend.',
    date: '2024-12-18',
    program: 'morning',
    field: 'SE',
    author: 'Prof. Sarah Ali',
  },
  {
    id: '3',
    title: 'Evening Program Class Timing Update',
    content: 'Due to winter schedule, evening classes will now start at 4:00 PM instead of 5:00 PM.',
    date: '2024-12-15',
    program: 'evening',
    field: null,
    author: 'Administration',
  },
  {
    id: '4',
    title: 'Final Year Project Presentations',
    content: 'FYP presentations for CS students will commence from January 15, 2025.',
    date: '2024-12-12',
    program: null,
    field: 'CS',
    author: 'Dr. Fatima Noor',
  },
  {
    id: '5',
    title: 'Library Resources Update',
    content: 'New digital resources have been added to the library. Access IEEE and ACM digital libraries with your student ID.',
    date: '2024-12-10',
    program: null,
    field: null,
    author: 'Library Department',
  },
];

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Data Structures Notes - Complete',
    type: 'notes',
    subject: 'Data Structures',
    program: 'morning',
    field: 'CS',
    downloadUrl: '#',
  },
  {
    id: '2',
    title: 'Software Requirements Engineering',
    type: 'notes',
    subject: 'SRE',
    program: 'morning',
    field: 'SE',
    downloadUrl: '#',
  },
  {
    id: '3',
    title: 'Database Systems Assignment 3',
    type: 'assignment',
    subject: 'Database Systems',
    program: 'evening',
    field: 'CS',
    downloadUrl: '#',
  },
  {
    id: '4',
    title: 'OOP Past Paper 2023',
    type: 'past-paper',
    subject: 'Object Oriented Programming',
    program: null,
    field: 'CS',
    downloadUrl: '#',
  },
  {
    id: '5',
    title: 'Web Development Assignment 2',
    type: 'assignment',
    subject: 'Web Development',
    program: 'morning',
    field: 'SE',
    downloadUrl: '#',
  },
  {
    id: '6',
    title: 'Operating Systems Past Paper 2022',
    type: 'past-paper',
    subject: 'Operating Systems',
    program: null,
    field: null,
    downloadUrl: '#',
  },
];

const mockTimetable: TimetableEntry[] = [
  { id: '1', day: 'Monday', time: '08:30 - 10:00', subject: 'Data Structures', room: 'LH-1', instructor: 'Dr. Ahmed Khan' },
  { id: '2', day: 'Monday', time: '10:15 - 11:45', subject: 'Database Systems', room: 'LH-2', instructor: 'Prof. Sarah Ali' },
  { id: '3', day: 'Tuesday', time: '08:30 - 10:00', subject: 'Operating Systems', room: 'LH-3', instructor: 'Dr. Fatima Noor' },
  { id: '4', day: 'Tuesday', time: '10:15 - 11:45', subject: 'Computer Networks', room: 'LH-1', instructor: 'Dr. Imran Shah' },
  { id: '5', day: 'Wednesday', time: '08:30 - 10:00', subject: 'Software Engineering', room: 'LH-2', instructor: 'Prof. Aisha Khan' },
  { id: '6', day: 'Thursday', time: '10:15 - 11:45', subject: 'Data Structures Lab', room: 'Lab-1', instructor: 'Mr. Hassan Ali' },
  { id: '7', day: 'Friday', time: '08:30 - 10:00', subject: 'Database Systems Lab', room: 'Lab-2', instructor: 'Ms. Zara Ahmed' },
];

const mockCourses: Course[] = [
  { id: '1', name: 'Data Structures & Algorithms', code: 'CS-301', semester: 3, field: 'CS' },
  { id: '2', name: 'Database Systems', code: 'CS-302', semester: 3, field: 'CS' },
  { id: '3', name: 'Operating Systems', code: 'CS-303', semester: 3, field: 'CS' },
  { id: '4', name: 'Software Requirements Engineering', code: 'SE-301', semester: 3, field: 'SE' },
  { id: '5', name: 'Software Design & Architecture', code: 'SE-302', semester: 3, field: 'SE' },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedProgram, setSelectedProgram] = useState<Program>(null);
  const [selectedField, setSelectedField] = useState<Field>(null);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);

  const isAuthenticated = !!user && !!token;

  const saveAuth = (jwtToken: string, apiUser: { _id: string; name: string; email: string; role: string }, roleOverride?: UserRole) => {
    localStorage.setItem(AUTH_TOKEN_KEY, jwtToken);
    setToken(jwtToken);

    const resolvedRole: UserRole =
      (apiUser.role === 'student' || apiUser.role === 'faculty' ? apiUser.role : null) ||
      roleOverride ||
      null;

    const appUser: User = {
      id: apiUser._id,
      name: apiUser.name,
      email: apiUser.email,
      role: resolvedRole,
      field: selectedField || 'CS',
      program: selectedProgram || 'morning',
    };

    setUser(appUser);
  };

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error('Login failed:', data);
        return false;
      }

      if (!data.token || !data.user) {
        // eslint-disable-next-line no-console
        console.error('Login response missing token or user');
        return false;
      }

      saveAuth(data.token, data.user, role);
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error('Signup failed:', data);
        return false;
      }

      if (!data.token || !data.user) {
        // eslint-disable-next-line no-console
        console.error('Signup response missing token or user');
        return false;
      }

      saveAuth(data.token, data.user, role);
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  // Restore auth from localStorage on first load
  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!storedToken) return;

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok || !data.user) {
          localStorage.removeItem(AUTH_TOKEN_KEY);
          setToken(null);
          setUser(null);
          return;
        }

        setToken(storedToken);

        const apiUser = data.user;
        const resolvedRole: UserRole =
          apiUser.role === 'student' || apiUser.role === 'faculty' ? apiUser.role : null;

        const restoredUser: User = {
          id: apiUser._id,
          name: apiUser.name,
          email: apiUser.email,
          role: resolvedRole,
          field: selectedField || 'CS',
          program: selectedProgram || 'morning',
        };

        setUser(restoredUser);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading current user:', error);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setToken(null);
        setUser(null);
      }
    };

    fetchCurrentUser();
    // We intentionally want this to run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addAnnouncement = (announcement: Omit<Announcement, 'id' | 'date'>) => {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: String(Date.now()),
      date: new Date().toISOString().split('T')[0],
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        selectedProgram,
        setSelectedProgram,
        selectedField,
        setSelectedField,
        token,
        user,
        setUser,
        isAuthenticated,
        login,
        signup,
        logout,
        announcements,
        addAnnouncement,
        resources: mockResources,
        timetable: mockTimetable,
        courses: mockCourses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}