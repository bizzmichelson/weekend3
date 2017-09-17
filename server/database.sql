CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    task varchar(200),
	complete boolean DEFAULT false
);
INSERT INTO todo(task,complete) VALUES('brush teeth',false);
