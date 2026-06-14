import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { InterestMatching } from "./components/InterestMatching";
import { Icebreakers } from "./components/Icebreakers";
import { EventDiscovery } from "./components/EventDiscovery";
import { StudyPartner } from "./components/StudyPartner";
import { Profile } from "./components/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "interests", Component: InterestMatching },
      { path: "icebreakers", Component: Icebreakers },
      { path: "events", Component: EventDiscovery },
      { path: "study-partners", Component: StudyPartner },
      { path: "profile", Component: Profile },
    ],
  },
]);
