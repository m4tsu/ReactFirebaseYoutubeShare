import { useContext, useState, useEffect } from "react";
import { AuthContext, FirebaseContext } from "context";
import { AppUser } from "types/AppUser";

// type Arg = {
//   uid: string;
// };

// export const useCheckFollow = ({ uid }: Arg) => {
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);
//   const { currentUser } = useContext(AuthContext);
//   const { db } = useContext(FirebaseContext);

//   useEffect(() => {
//     if (!db) throw new Error("Firestore is not initialized");
//     if (!currentUser) {
//       return;
//     }
//     const followQuery = db
//       .collection("users")
//       .doc(currentUser.uid)
//       .collection("follows")
//       .doc(uid);
//     const load = async () => {
//       setLoading(true);
//       try {
//         const followDoc = await followQuery.get();
//         console.log(followDoc);
//         console.log(followDoc.exists);
//         if (followDoc.exists) {
//           setIsFollowing(true);
//           setLoading(true);
//         } else {
//           setIsFollowing(false);
//           setLoading(true);
//         }
//       } catch (err) {
//         console.log(err);
//         setError(err);
//       }
//     };
//     load();
//   }, [db, uid, currentUser]);

//   return { isFollowing, loading };
// };

type Arg = {
  currentUser: AppUser | null;
  uid: string;
  db: firebase.firestore.Firestore;
};

export const checkFollow = async ({ currentUser, uid, db }: Arg) => {
  if (!currentUser) {
    return false;
  }
  const followQuery = db
    .collection("users")
    .doc(currentUser.uid)
    .collection("follows")
    .doc(uid);

  const followDoc = await followQuery.get();
  console.log(followDoc);
  if (followDoc.exists) {
    return true;
  }

  return false;

  // useEffect(() => {
  //   if (!db) throw new Error("Firestore is not initialized");
  //   if (!currentUser) {
  //     return;
  //   }
  //   const followQuery = db
  //     .collection("users")
  //     .doc(currentUser.uid)
  //     .collection("follows")
  //     .doc(uid);
  //   const load = async () => {
  //     setLoading(true);
  //     try {
  //       const followDoc = await followQuery.get();
  //       console.log(followDoc);
  //       console.log(followDoc.exists);
  //       if (followDoc.exists) {
  //         setIsFollowing(true);
  //         setLoading(true);
  //       } else {
  //         setIsFollowing(false);
  //         setLoading(true);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       setError(err);
  //     }
  //   };
  //   load();
  // }, [db, uid, currentUser]);
};
