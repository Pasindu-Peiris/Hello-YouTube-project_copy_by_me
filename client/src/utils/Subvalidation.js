const userDataset3 = userDataset.filter(user1 =>
    !userDataset2.some(user2 =>
        user1.name === user2.name
    )
);

console.log(userDataset3);
