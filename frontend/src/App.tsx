import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { unAuthGuard } from './common/utils/routes';
import LoadingView from './components/Loading/LoadingModal';
import PrivateRoute from './components/Route/PrivateRoute';
import store, { persistor } from './store';

import Header from './views/header/Header';
import Footer from './components/Footer/Footer';
import { storage } from './common/utils/storage';

const HomeView = lazy(() => import('./views/home/HomeView'));
const IntroView = lazy(() => import('./views/intro/IntroView'));
const AnnView = lazy(() => import('./views/announcement/AnnView'));
const AnnItem = lazy(() => import('./views/announcement/AnnItem'));
const AnnCreate = lazy(() => import('./views/announcement/AnnCreate'));
const AnnEdit = lazy(() => import('./views/announcement/AnnEdit'));
const FacilityView = lazy(() => import('./views/facility/FacilityView'));
const ContentView = lazy(() => import('./views/contents/ContentView'));
const ContentItem = lazy(() => import('./views/contents/ContentItem'));
const ContentCreate = lazy(() => import('./views/contents/ContentCreate'));
const ContentEdit = lazy(() => import('./views/contents/ContentEdit'));
const LabView = lazy(() => import('./views/lab/LabView'));
const LabItem = lazy(() => import('./views/lab/LabItem'));
const LabCreate = lazy(() => import('./views/lab/LabCreate'));
const LabEdit = lazy(() => import('./views/lab/LabEdit'));
const CampaignView = lazy(() => import('./views/campaign/CampaignView'));
const CampaignItem = lazy(() => import('./views/campaign/CampaignItem'));
const CampaignCreate = lazy(() => import('./views/campaign/CampaignCreate'));
const CampaignEdit = lazy(() => import('./views/campaign/CampaignEdit'));
const BoardView = lazy(() => import('./views/board/BoardView'));
const BoardItem = lazy(() => import('./views/board/BoardItem'));
const BoardCreate = lazy(() => import('./views/board/BoardCreate'));
const BoardEdit = lazy(() => import('./views/board/BoardEdit'));
const LoginView = lazy(() => import('./views/authentication/LoginView'));
const RegisterView = lazy(() => import('./views/authentication/RegisterView'));
const UserManagementView = lazy(() => import('./views/user_management/UserManagementView'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  console.log('start');

  const token = storage.getToken();
  const isLoggedIn = token !== null;
  let isAdmin = false;
  let userId;

  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));

    if (decodedToken.role === 'Admin') {
      isAdmin = true;
    } else {
      userId = decodedToken.id;
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Suspense fallback={<LoadingView open />}>
            <BrowserRouter>
              <ToastContainer />
              <LoadingView />
              <div className="container">
                <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
                <Routes>
                  <Route path="/login" element={<PrivateRoute guards={[unAuthGuard]} element={<LoginView />} />} />
                  <Route path="/register" element={<PrivateRoute guards={[unAuthGuard]} element={<RegisterView />} />} />
                  <Route path="/" element={<PrivateRoute guards={[]} element={<HomeView />} />} />
                  <Route path="/intro" element={<PrivateRoute guards={[]} element={<IntroView />} />} />
                  <Route path="/announcement" element={<PrivateRoute guards={[]} element={<AnnView isLoggedIn={isLoggedIn} />} />} />
                  <Route path="/announcement/create" element={<PrivateRoute guards={[]} element={<AnnCreate />} />} />
                  <Route path="/announcement/:id" element={<PrivateRoute guards={[]} element={<AnnItem />} />} />
                  <Route path="/announcement/edit/:id" element={<PrivateRoute guards={[]} element={<AnnEdit />} />} />
                  <Route path="/facility" element={<PrivateRoute guards={[]} element={<FacilityView isLoggedIn={isLoggedIn} />} />} />
                  <Route path="/content" element={<PrivateRoute guards={[]} element={<ContentView isLoggedIn={isLoggedIn} />} />} />
                  <Route path="/content/create" element={<PrivateRoute guards={[]} element={<ContentCreate />} />} />
                  <Route path="/content/:id" element={<PrivateRoute guards={[]} element={<ContentItem />} />} />
                  <Route path="/content/edit/:id" element={<PrivateRoute guards={[]} element={<ContentEdit />} />} />
                  <Route path="/lab" element={<PrivateRoute guards={[]} element={<LabView isLoggedIn={isLoggedIn} userId={userId} />} />} />
                  <Route path="/lab/create" element={<PrivateRoute guards={[]} element={<LabCreate />} />} />
                  <Route path="/lab/:id" element={<PrivateRoute guards={[]} element={<LabItem />} />} />
                  <Route path="/lab/edit/:id" element={<PrivateRoute guards={[]} element={<LabEdit />} />} />
                  <Route
                    path="/user-management"
                    element={<PrivateRoute guards={[]} element={<UserManagementView isLoggedIn={isLoggedIn} />} />}
                  />
                  <Route path="/campaign" element={<PrivateRoute guards={[]} element={<CampaignView isLoggedIn={isLoggedIn} />} />} />
                  <Route path="/campaign/create" element={<PrivateRoute guards={[]} element={<CampaignCreate />} />} />
                  <Route path="/campaign/:id" element={<PrivateRoute guards={[]} element={<CampaignItem />} />} />
                  <Route path="/campaign/edit/:id" element={<PrivateRoute guards={[]} element={<CampaignEdit />} />} />
                  <Route path="/board" element={<PrivateRoute guards={[]} element={<BoardView isLoggedIn={isLoggedIn} />} />} />
                  <Route path="/board/create" element={<PrivateRoute guards={[]} element={<BoardCreate isLoggedIn={isLoggedIn} />} />} />
                  <Route path="/board/:id" element={<PrivateRoute guards={[]} element={<BoardItem />} />} />
                  <Route path="/board/edit/:id" element={<PrivateRoute guards={[]} element={<BoardEdit />} />} />
                </Routes>
                <Footer />
              </div>
            </BrowserRouter>
          </React.Suspense>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
