insert into homepage values(1,'Welcome to TFGP Computer Engineering Department, where innovation meets practicality to shape the future of technology.')
insert into homepage values(2,'To become a recognized leader in Gujarat by producing Technically   Skilled, Creative, Independent and Socially Inclined Diploma Computer Engineers contributing towards the ever changing needs of society.');
insert into homepage values(3,'1. To provide quality undergraduate education in both the theory and applied computer science and train the students to implement this knowledge to solve the problems of real world.');
insert into homepage values(4,'2. To develop positive attitude towards lifelong learning according to the demands of versatile society.');
insert into homepage values(5,'3. To support other academic and socially interactive programs conducted by the institute.');


create table blogs(
    id int auto_increment,
    heading text,
    blogg text,
    primary key(id)
);

insert into blogs(heading,blogg) values('test','testing');